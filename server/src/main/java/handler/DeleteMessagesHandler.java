package handler;

import dao.ConversationDao;
import dao.MessageDao;
import handler.AuthFilter.AuthResult;
import org.bson.Document;
import request.ParsedRequest;
import response.CustomHttpResponse;
import response.HttpResponseBuilder;
import response.RestApiAppResponse;

public class DeleteMessagesHandler implements BaseHandler {
    @Override
    public HttpResponseBuilder handleRequest(ParsedRequest request) {
        // We use the message DAO to access messages and delete them from the database
        MessageDao messageDao = MessageDao.getInstance();
        AuthResult authResult = AuthFilter.doFilter(request);
        if(!authResult.isLoggedIn){
            return new HttpResponseBuilder().setStatus(StatusCodes.UNAUTHORIZED);
        }

        // use query params sent in request to create a new doc
        var toDelete = new Document("conversationId", request.getQueryParam("conversationId"));
        // returns a list dtos that we need to remove from the message DAO
        var dtoToDelete = messageDao.query(toDelete);

        // added a delete function to MessageDao, takes in a list of dtos to delete
        messageDao.delete(dtoToDelete);

        var res = new RestApiAppResponse<>(true, null, "Messages Deleted");
        return new HttpResponseBuilder().setStatus("200 OK").setBody(res);
    }

}
