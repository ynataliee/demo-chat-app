package handler;

import dao.BlockDao;
import dao.UserDao;
import dto.BlockDto;
import org.bson.Document;
import request.ParsedRequest;
import response.HttpResponseBuilder;
import response.RestApiAppResponse;
import java.util.Comparator;
import java.util.stream.Collectors;
import java.util.List;


public class BlockUserHandler implements BaseHandler {
    @Override
    public HttpResponseBuilder handleRequest(ParsedRequest request) {
        BlockDao blockDao = BlockDao.getInstance();
        BlockDto blockDto = GsonTool.gson.fromJson(request.getBody(), dto.BlockDto.class);


        //check if authorized
        AuthFilter.AuthResult authResult = AuthFilter.doFilter(request);
        if(!authResult.isLoggedIn){
            return new HttpResponseBuilder().setStatus(StatusCodes.UNAUTHORIZED);
        }

        //check if already blocked
        String blockId = makeBlockId(blockDto.getFromId(), blockDto.getToId());
        Document doc = new Document("blockId", blockId);
        if (!blockDao.query(doc).isEmpty()) {
            var res = new RestApiAppResponse<>(false, null, "Already blocked "+ blockDto.getToId());
            return new HttpResponseBuilder().setStatus(StatusCodes.OK).setBody(res);
        }

        //block user
        blockDto.setBlockId(blockId);
        blockDao.put(blockDto);
        var res = new RestApiAppResponse<>(true, List.of(blockDto), "Successful blocked " + blockDto.getToId());
        return new HttpResponseBuilder().setStatus(StatusCodes.OK).setBody(res);
    }

    public static String makeBlockId(String a, String b){
        return List.of(a,b).stream()
            .sorted(Comparator.naturalOrder())
            .collect(Collectors.joining("_"));
    }
}
