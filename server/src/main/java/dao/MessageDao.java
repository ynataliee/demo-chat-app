package dao;

import com.mongodb.client.MongoCollection;
import dto.MessageDto;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import org.bson.Document;

// TODO fill this out
public class MessageDao extends BaseDao<MessageDto> {

  private static MessageDao instance;

  private MessageDao(MongoCollection<Document> collection){
    super(collection);
  }

  public static MessageDao getInstance(){
    if(instance != null){
      return instance;
    }
    instance = new MessageDao(MongoConnection.getCollection("MessageDao"));
    return instance;
  }

  public static MessageDao getInstance(MongoCollection<Document> collection){
    instance = new MessageDao(collection);
    return instance;
  }

  // Todo use .find with a Document filter
  @Override
  public void put(MessageDto messageDto) {
    collection.insertOne(messageDto.toDocument());
  }

  // New Function added to delete a message off the Messages DAO
  public void delete(List<MessageDto> messageDto){
    messageDto.forEach(msgDto -> {
      collection.deleteOne(msgDto.toDocument());
    });
  }

  public List<MessageDto> query(Document filter){
    return collection.find(filter)
        .into(new ArrayList<>())
        .stream()
        .map(MessageDto::fromDocument)
        .collect(Collectors.toList());
  }

}
