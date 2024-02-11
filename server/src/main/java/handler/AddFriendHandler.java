package handler;

import dao.FriendDao;
import dto.FriendDto;
import org.bson.Document;
import request.ParsedRequest;
import response.HttpResponseBuilder;
import response.RestApiAppResponse;
import java.util.List;
import java.util.Comparator;
import java.util.stream.Collectors;

public class AddFriendHandler implements BaseHandler {
    @Override
    public HttpResponseBuilder handleRequest(ParsedRequest request) {
        FriendDao friendDao = FriendDao.getInstance();
        FriendDto friendDto = GsonTool.gson.fromJson(request.getBody(), FriendDto.class);
        
        AuthFilter.AuthResult authResult = AuthFilter.doFilter(request);
        if (!authResult.isLoggedIn) {
            return new HttpResponseBuilder().setStatus(StatusCodes.UNAUTHORIZED);
        }

        //Shouldn't be able to add the same friend twice, so checks if already friend
        String friendId = makeFriendId(friendDto.getFromId(), friendDto.getToId());
        Document doc = new Document("friendId", friendId);
        if (!friendDao.query(doc).isEmpty()) {
            var res = new RestApiAppResponse<>(false, null, "Already friends with " + friendDto.getToId());
            return new HttpResponseBuilder().setStatus(StatusCodes.OK).setBody(res);
        }

        //adds friend
        friendDto.setFriendId(friendId);
        friendDao.put(friendDto);
        var res = new RestApiAppResponse<>(true, List.of(friendDto), "Successfully added friend " + friendDto.getToId());
        return new HttpResponseBuilder().setStatus(StatusCodes.OK).setBody(res);
    }

    public static String makeFriendId(String a, String b){
        return List.of(a,b).stream()
            .sorted(Comparator.naturalOrder())
            .collect(Collectors.joining("_"));
    }
}

