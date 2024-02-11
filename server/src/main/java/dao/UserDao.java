package dao;

import com.mongodb.client.MongoCollection;
import dto.UserDto;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import org.bson.Document;

public class UserDao extends BaseDao<UserDto> {

  private static UserDao instance;

  private UserDao(MongoCollection<Document> collection){
    super(collection);
  }

  public static UserDao getInstance(){
    if(instance != null){
      return instance;
    }
    // this is where we are accessing our mongodb server that we set up access to in the MongoConnection Class
    instance = new UserDao(MongoConnection.getCollection("UserDao"));
    return instance;
  }

  public static UserDao getInstance(MongoCollection<Document> collection){
    instance = new UserDao(collection);
    return instance;
  }

  @Override
  public void put(UserDto messageDto) {
    collection.insertOne(messageDto.toDocument());
  }

  public List<UserDto> query(Document filter){
    return collection.find(filter)
        .into(new ArrayList<>())
        .stream()
        .map(UserDto::fromDocument)// create a userDto from a document
        .collect(Collectors.toList());
  }

}
