package com.example.springrest.controller.user;

import java.util.Iterator;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.example.springrest.model.User;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.ReadChannel;

import java.io.IOException;
import java.io.File;
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.nio.ByteBuffer;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@RestController
public class UserController {

  private final UserRepository repository;
  private static String session_id;
  private final String bucket_name = "goaltimer";

  private Storage storage = StorageOptions.getDefaultInstance().getService();

  /**
   * @param repository
   */
  public UserController(UserRepository repository) {
    this.repository = repository;
  }

  private String convertByteArrayToHexString(byte[] arrayBytes) {
    StringBuffer stringBuffer = new StringBuffer();
    for (int i = 0; i < arrayBytes.length; i++) {
      stringBuffer.append(Integer.toString((arrayBytes[i] & 0xff) + 0x100, 16).substring(1));
    }
    return stringBuffer.toString();
  }

  /**
   * 
   * @param data_loc
   * @return
   * @throws Exception
   */
  public String get_data(String data_loc) throws Exception {
    StringBuffer sb = new StringBuffer();
    try (ReadChannel channel = storage.reader(bucket_name, data_loc)) {
      ByteBuffer bytes = ByteBuffer.allocate(64 * 1024);
      while (channel.read(bytes) > 0) {
        bytes.flip();
        String data = new String(bytes.array(), 0, bytes.limit());
        sb.append(data);
        bytes.clear();
      }
      System.out.println(sb.toString());
    }
    return sb.toString();
  }

  /**
   * 
   * @param data_loc
   * @return
   * @throws IOException
   */
  public String store_data(String data_loc) throws IOException {
    File file = new File(data_loc);
    if (storage.get(bucket_name, data_loc) == null) {
      BlobId blob_id = BlobId.of(bucket_name, data_loc);
      BlobInfo info = BlobInfo.newBuilder(blob_id).build();
      byte[] arr = Files.readAllBytes(Paths.get(file.toURI()));
      storage.create(info, arr);
      return "File uploaded to " + data_loc;
    }
    return "File failed to upload to " + data_loc;
  }

  /**
   * 
   * @return
   * @throws Exception
   */
  @GetMapping("/getall")
  public String getAll() throws Exception {
    StringBuffer sb = new StringBuffer();
    List<User> users = repository.findAll();
    for (Iterator<User> iter = users.iterator(); iter.hasNext();) {
      User element = iter.next();
      sb.append(get_data("goaltimer-dbdump/" + element.getHashID() + "/userinfo.json"));
    }
    return sb.toString();
  }

  /* Add account to cloud for testing */
  @GetMapping("/getUser")
  public String getUser() throws Exception {
    StringBuffer sb = new StringBuffer();
    return sb.toString();
  }

  /**
   * 
   * @return
   * @throws Exception
   */
  /* Add account to cloud for testing */
  @GetMapping("/sendall")
  public String sendAll() throws Exception {
    List<User> users = repository.findAll();
    for (Iterator<User> iter = users.iterator(); iter.hasNext();) {
      User element = iter.next();
      store_data("goaltimer-dbdump/" + element.getHashID() + "/userinfo.json");
    }
    return "Uploaded Successfuly";
  }

  /**
   * 
   * @return
   * @throws Exception
   */
  @GetMapping("/dumpusers")
  public String all() throws Exception {
    List<User> users = repository.findAll();
    for (Iterator<User> iter = users.iterator(); iter.hasNext();) {
      User element = iter.next();
      addUser(element);
    }
    return users.toString();
  }

  /**
   * 
   * @param newUser
   * @return
   * @throws Exception
   */
  /* Add account to cloud for testing */
  @SuppressWarnings("unchecked")
  private String addUser(User newUser) throws Exception {
    newUser.setHashID(newUser.hash(newUser.getEmail()));
    File userDir = new File("goaltimer-dbdump/" + newUser.getHashID());
    if (!userDir.exists()) {
      userDir.mkdirs();
      JSONObject user_details = new JSONObject();
      JSONObject user_object = new JSONObject();
      user_details.put("blobID", newUser.getBlobID());
      user_details.put("email", newUser.getEmail());
      user_details.put("firstName", newUser.getFirstName());
      user_details.put("hashID", newUser.getHashID());
      user_details.put("id", newUser.getId());
      user_details.put("lastName", newUser.getLastName());
      user_details.put("name", newUser.getFirstName() + " " + newUser.getLastName());
      user_details.put("password", newUser.getPassword());
      user_object.put("user", user_details);
      String data_loc = "goaltimer-dbdump/" + newUser.getHashID() + "/userinfo.json";
      File user = new File(data_loc);
      StringBuffer sb = new StringBuffer();
      if (!user.exists()) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(user))) {
          sb.append(user_details);
          writer.write(sb.toString());
        }
      }
    }
    return "User is added to the database";
  }

  /**
   * 
   * @param newUser
   * @return
   * @throws Exception
   */
  @PostMapping(value = "/users/register/")
  public String addEmployee(@RequestBody User newUser) throws Exception {
    StringBuffer sb = new StringBuffer();
    File userDir = new File("goaltimer-dbdump/" + newUser.getHashID());
    if (!userDir.exists()) {
      userDir.mkdirs();
      String data_loc = "goaltimer-dbdump/" + newUser.getHashID() + "/userinfo.json";
      File user = new File(data_loc);
      BlobId blob_id = BlobId.of(bucket_name, data_loc);
      newUser.setBlobId(blob_id);
      if (!user.exists()) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(user))) {
          sb.append(newUser);
          writer.write(sb.toString());
          writer.flush();
          writer.close();
        }
        store_data("goaltimer-dbdump/" + newUser.getHashID() + "/userinfo.json");
      }
    }
    repository.save(newUser);
    return "User is added to the database.";
  }

  /**
   * 
   * @param user
   * @param session
   * @return
   * @throws Exception
   */
  @PostMapping(value = "/login/")
  public User getEmployee(@RequestBody User user, HttpSession session) throws Exception {

    final String JSON_DATA = get_data("goaltimer-dbdump/" + user.hash(user.getEmail()) + "/userinfo.json").toString();
    JSONParser parser = new JSONParser();
    JSONObject json = (JSONObject) parser.parse(JSON_DATA);
    User temp = new User();
    temp.setFirstName(json.get("firstName").toString());
    temp.setLastName(json.get("lastName").toString());
    temp.setEmail(json.get("email").toString());
    temp.setPassword(json.get("password").toString());
    temp.setId(Long.parseLong(json.get("id").toString()));
    temp.setBlobId((BlobId) json.get("blobID"));
    temp.setHashID(json.get("hashID").toString());
    return temp;

  }

  /**
   * 
   * @param user
   * @param session
   * @return
   */
  @PostMapping(value = "/settings/")
  public User updateEmployee(@RequestBody User user, HttpSession session) {
    // return "Testing, was in updateEmployee from Controller here";

    // User original = (User)session.getAttribute(session_id);
    String email = user.getEmail();
    String newFirstName = user.getFirstName();
    String newLastName = user.getLastName();

    User original = (User) session.getAttribute(session_id);

    List<User> users = repository.findByEmail(email);
    for (Iterator<User> iter = users.iterator(); iter.hasNext();) {
      User element = iter.next();
      if (element.getEmail().equals(original.getEmail())) {
        element.setFirstName(newFirstName);
        element.setLastName(newLastName);
        repository.save(element);
        return element;
      }
    }
    return null;
  }

  /**
   * 
   * @param request
   * @return
   */
  @PostMapping("/invalidate/session")
  public String destroySession(HttpServletRequest request) {
    request.getSession().invalidate();
    return "redirect:/home";
  }
}
