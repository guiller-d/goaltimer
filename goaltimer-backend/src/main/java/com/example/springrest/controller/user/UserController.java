package com.example.springrest.controller.user;

import java.util.Iterator;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.springrest.model.User;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.time.LocalDateTime;
import java.util.Random;

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

@RestController
public class UserController {

  private final UserRepository repository;
  private static String session_id;
  private final String bucket_name = "goaltimer";

  private Storage storage = StorageOptions.getDefaultInstance().getService();

  /**
   * 
   * @param arrayBytes
   * @return
   */
  private String convertByteArrayToHexString(byte[] arrayBytes) {
    StringBuffer stringBuffer = new StringBuffer();
    for (int i = 0; i < arrayBytes.length; i++) {
      stringBuffer.append(Integer.toString((arrayBytes[i] & 0xff) + 0x100, 16).substring(1));
    }
    return stringBuffer.toString();
  }

  /**
   * @param repository
   */
  public UserController(UserRepository repository) {
    this.repository = repository;
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
      return sb.toString();
    }
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
      BlobId id = BlobId.of(bucket_name, data_loc);
      BlobInfo info = BlobInfo.newBuilder(id).build();
      byte[] arr = Files.readAllBytes(Paths.get(file.toURI()));
      storage.create(info, arr);
      return "File uploaded to " + data_loc;
    }

    return "File failed to upload to " + data_loc;
  }

  /**
   * 
   * @param data_loc
   * @return
   * @throws IOException
   */
  public String create(String data_loc) throws IOException {
    if (storage.get(bucket_name, data_loc) == null) {
      BlobId id = BlobId.of(bucket_name, data_loc);
      BlobInfo info = BlobInfo.newBuilder(id).build();
      storage.create(info);
      return "File uploaded to " + data_loc;
    }
    return "File failed to upload to " + data_loc;
  }

  /* Add account to cloud for testing */
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
  @GetMapping("/sendall")
  public String sendAll() throws Exception {
    List<User> users = repository.findAll();
    for (Iterator<User> iter = users.iterator(); iter.hasNext();) {
      User element = iter.next();
      store_data("goaltimer-dbdump/" + element.getHashID() + "/userinfo.json");
    }
    return "Uploaded Successfuly";
  }

  /* Add account to cloud for testing */
  @GetMapping("/dumpusers")
  public String all() throws Exception {
    List<User> users = repository.findAll();
    StringBuffer sb = new StringBuffer();
    StringBuffer sb_out = new StringBuffer();
    for (Iterator<User> iter = users.iterator(); iter.hasNext();) {
      User element = iter.next();
      File userDir = new File("goaltimer-dbdump/" + element.getHashID());
      if (!userDir.exists()) {
        userDir.mkdirs();
        File user = new File("goaltimer-dbdump/" + element.getHashID() + "/userinfo.json");
        if (!user.exists()) {
          try (BufferedWriter writer = new BufferedWriter(new FileWriter(user))) {
            sb.append(element);
            writer.write(sb.toString());
            writer.flush();
            writer.close();
          }
        }
      }
    }
    return sb_out.toString();
  }
  
  @PostMapping(value = "/users/register/")
  public String addEmployee(@RequestBody User newUser) throws Exception {
    String user_folder = "testing_folder/users/" + newUser.getHashID() + "/userInfo/" + newUser;
    create(user_folder);
    repository.save(newUser);
    return "User is added to the database.";
  }

  @PostMapping(value = "/login/")
  public User getEmployee(@RequestBody User user, HttpSession session) throws Exception {
    // return session.getAttribute("email") + ", " + session.getAttribute("pwd");
    String email = user.getEmail();
    String password = user.getPassword();
    User temp = null;
    List<User> users = repository.findByEmail(email);
    // if (users.size() <= 0) return -1;
    for (Iterator<User> iter = users.iterator(); iter.hasNext();) {
      User element = iter.next();
      if (element.getPassword().equals(password)) {
        temp = element;

        // assign specific session_id to that user
        try {
          String dateAndTime = LocalDateTime.now() + "";
          MessageDigest digest = MessageDigest.getInstance("MD5");
          Random rand = new Random();
          byte[] hashedBytes = digest.digest(dateAndTime.getBytes("UTF-8"));
          session_id = convertByteArrayToHexString(hashedBytes);
          session.setAttribute(session_id, temp);
        } catch (NoSuchAlgorithmException | UnsupportedEncodingException ex) {
          throw new Exception("Could not generate hash from String");
        }
        break;
      }
    }
    return temp;
  }

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

  @PostMapping("/invalidate/session")
  public String destroySession(HttpServletRequest request) {
    request.getSession().invalidate();
    return "redirect:/home";
  }
}
