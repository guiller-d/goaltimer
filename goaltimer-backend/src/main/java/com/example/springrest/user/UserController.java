package com.example.springrest.user;

import java.util.Iterator;
import java.util.List;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.MediaType;

import com.example.springrest.model.User;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.io.UnsupportedEncodingException;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpServletResponse;
import java.time.LocalDateTime;
import java.util.Random;


@RestController
public class UserController {

  private final UserRepository repository;
  private static String session_id;

  UserController(UserRepository repository) {
    this.repository = repository;
  }
  public static String getSessionID (){
    return session_id;
  }
  // Aggregate root
  // tag::get-aggregate-root[]
  @GetMapping("/users")
  public List<User> all() {
    List<User> users = repository.findAll();
    return users;
  }

  @RequestMapping(value = "/create", method = RequestMethod.POST, consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
  public String create(@RequestBody MultiValueMap<String, String> formData) {
    System.out.println(formData);
    System.out.println(formData.get("firstName"));
    // your code goes here
    return "";
  }

  @PostMapping(value = "/addusers")
  public String newEmployee(@RequestBody User newUser) {
    System.out.println(newUser);
    repository.save(newUser);

    return "new user successfully added";
  }

  public String removeRegex(String str, String regex1, String regex2){
    str = str.replace(regex1, "");
    str = str.replace(regex2, "");
    return str;
  }

  private static String convertByteArrayToHexString(byte[] arrayBytes) {
    StringBuffer stringBuffer = new StringBuffer();
    for (int i = 0; i < arrayBytes.length; i++) {
        stringBuffer.append(Integer.toString((arrayBytes[i] & 0xff) + 0x100, 16)
                .substring(1));
    }
    return stringBuffer.toString();
}
  @PostMapping(value = "/login/")
  public User getEmployee(@RequestBody User user, HttpSession session) throws Exception {
    // return session.getAttribute("email") + ", " + session.getAttribute("pwd");
    String email = user.getEmail();
    String password = user.getPassword();
    User temp = null;
    List<User> users = repository.findByEmail(email);
    
    //if (users.size() <= 0) return -1;
    for (Iterator<User> iter = users.iterator(); iter.hasNext();) {
      User element = iter.next();
      if (element.getPassword().equals(password)) {
        temp = element;

        //assign specific session_id to that user
        try{
          String dateAndTime = LocalDateTime.now() + "";
          MessageDigest digest = MessageDigest.getInstance("MD5");
          Random rand = new Random();
          byte[] hashedBytes = digest.digest(dateAndTime.getBytes("UTF-8"));
          session_id = convertByteArrayToHexString(hashedBytes);
          session.setAttribute(session_id, temp);
        }
        catch (NoSuchAlgorithmException | UnsupportedEncodingException ex) {
          throw new Exception("Could not generate hash from String");
        }
        break;
      } 
    }
    return temp;
  }
//   @PostMapping(value = "/settings/{email}/{firstName}/{lastName}")
//   public int updateEmployee(@RequestBody User user, @PathVariable String email, @PathVariable String firstName, @PathVariable String lastName) {
//     email = removeRegex(email,"{", "}");
//     firstName = removeRegex(firstName, "{", "}");
//     lastName = removeRegex(lastName,"{", "}");

//     boolean flag = false;
//     List<User> users = repository.findByEmail(email);
//     if (users.size() <= 0) return -1;
//     for (Iterator<User> iter = users.iterator(); iter.hasNext();) {
//       User element = iter.next();
//       if (element.getEmail().equals(email)) {
//         element.setFirstName(firstName);
//         element.setLastName(lastName);
        
//         flag = true;
//         break;
//     }
//   }
//   return (flag) ? 1: 0;
// }


  @PostMapping(value = "/settings/")
  public User updateEmployee(@RequestBody User user, HttpSession session) {
    //return "Testing, was in updateEmployee from Controller here";

    //User original = (User)session.getAttribute(session_id);
    String email = user.getEmail();
    String newFirstName = user.getFirstName();
    String newLastName = user.getLastName();

    User original = (User) session.getAttribute(session_id);

    List<User> users = repository.findByEmail(email);
    for (Iterator<User> iter = users.iterator(); iter.hasNext();) {
      User element = iter.next();
      if(element.getEmail().equals(original.getEmail())){
        element.setFirstName(newFirstName);
        element.setLastName(newLastName);
        repository.save(element);
        //session.set(session_id, element);
        return element;
      }
    }
    return null;
}

  //@GetMapping(value = "/register/{email}/{password}")
  // @PostMapping(value = "register/{firstName}/{lastName}/{email}/{password}")
  // public String addEmployee(@RequestBody User user, @PathVariable String firstName, @PathVariable String lastName, @PathVariable String email,  @PathVariable String password) {

  //   // String firstName = user.getFirstName();
  //   // String lastName = user.getLastName();
  //   // String email = user.getEmail();
  //   // String password = user.getPassword();
  //   email = removeRegex(email,"{", "}");
  //   firstName = removeRegex(firstName, "{", "}");
  //   lastName = removeRegex(lastName,"{", "}");
  //   password = removeRegex(password,"{", "}");
  //   User newUser = new User();
  //   newUser.setFirstName(firstName);
  //   newUser.setLastName(lastName);
  //   newUser.setEmail(email);
  //   newUser.setPassword(password);
  //   repository.save(newUser);

  //   return "User is added to the database.";
  // }


  @PostMapping(value = "/users/register/")
  public String addEmployee(@RequestBody User user) {

    // String firstName = user.getFirstName();
    // String lastName = user.getLastName();
    // String email = user.getEmail();
    // String password = user.getPassword();
    // User newUser = new User();
    // newUser.setFirstName(firstName);
    // newUser.setLastName(lastName);
    // newUser.setEmail(email);
    // newUser.setPassword(password);
    // repository.save(newUser);
    repository.save(user);

    return "User is added to the database.";
  }

  @PostMapping("/invalidate/session")
    public String destroySession(HttpServletRequest request) {
        //invalidate the session , this will clear the data from configured database (Mysql/redis/hazelcast)
        request.getSession().invalidate();
        return "redirect:/home";
    }

  // @Modifying
  // @PostMapping(value = "/delete/")
  // public void deleteEmployee(@RequestBody User user, HttpSession session) {


  //   User original = session.getAttribute(session_id);

  //   //is email is not the same as the user's email in the session- redirect them back to login
  //   if(!original.getEmail().equals(user.getEmail())){
  //     //TBD
  //   }
  //   else{
  //     //somehow remove the user
  //     original.setFirstName(newFirstName);
  //     original.setLastName(newLastName);
  //     session.setAttribute(session_id, original);
  //   }
  //   }
}

