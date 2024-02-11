package dao;

import com.mongodb.client.MongoCollection;
import dto.BlockDto;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import org.bson.Document;

public class BlockDao extends BaseDao<BlockDto> {

    private static BlockDao instance;

    private BlockDao(MongoCollection<Document> collection){
        super(collection);
    }

    public static BlockDao getInstance(){
        if(instance != null){
            return instance;
        }
        instance = new BlockDao(MongoConnection.getCollection("BlockDao"));
        return instance;
    }

    public static BlockDao getInstance(MongoCollection<Document> collection){
        instance = new BlockDao(collection);
        return instance;
    }

    @Override
    public void put(BlockDto blockDto) {
        collection.insertOne(blockDto.toDocument());
    }


    public List<BlockDto> query(Document filter){
        return collection.find(filter)
                .into(new ArrayList<>())
                .stream()
                .map(BlockDto::fromDocument)
                .collect(Collectors.toList());
    }

}