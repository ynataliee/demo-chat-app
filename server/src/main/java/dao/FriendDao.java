package dao;

import dto.FriendDto;
import com.mongodb.client.MongoCollection;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import org.bson.Document;

public class FriendDao extends BaseDao<FriendDto>{
    private static FriendDao instance;

    private FriendDao(MongoCollection<Document> collection){
        super(collection);
    }

    public static FriendDao getInstance(){
        if(instance != null){
            return instance;
        }
        instance = new FriendDao(MongoConnection.getCollection("FriendDao"));
        return instance;
    }

    public static FriendDao getInstance(MongoCollection<Document> collection){
        instance = new FriendDao(collection);
        return instance;
    }

    @Override
    public void put(FriendDto friendDto) {
        collection.insertOne(friendDto.toDocument());
    }


    public List<FriendDto> query(Document filter){
        return collection.find(filter)
                .into(new ArrayList<>())
                .stream()
                .map(FriendDto::fromDocument)
                .collect(Collectors.toList());
    }
}
