package handler;

import dao.UserDao;
import dto.UserDto;
import org.bson.Document;
import request.ParsedRequest;
import response.HttpResponseBuilder;
import response.RestApiAppResponse;
import java.util.List;


public class SearchUserHandler implements BaseHandler{

    @Override
    public HttpResponseBuilder handleRequest (ParsedRequest request) {
        //authenticate
        AuthFilter.AuthResult authResult = AuthFilter.doFilter(request);
        if (authResult.isLoggedIn == false) { //user not authenticated
            return new HttpResponseBuilder().setStatus((StatusCodes.UNAUTHORIZED));
        }

        UserDao userDao = UserDao.getInstance();

        //regex to match users starting with userName entered in "searchForUsers" regardless of case
        Document regexQuery = new Document("$regex","^(?i)" + request.getQueryParam("userName"));

        Document userNameQuery = new Document("userName", regexQuery);
        List<UserDto> queryList = userDao.query(userNameQuery);


        var response = new RestApiAppResponse<>(true, queryList, null);
        return new HttpResponseBuilder().setStatus(StatusCodes.OK).setBody(response);


    }
}
