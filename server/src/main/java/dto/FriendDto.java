package dto;

import org.bson.Document;

public class FriendDto extends BaseDto {
    private String friendId;
    private String fromId;
    private String toId;


    public String getFriendId() {
        return friendId;
    }

    public void setFriendId(String friendId) {
        this.friendId = friendId;
    }

    public String getFromId() {
        return fromId;
    }

    public void setFromId(String fromId) {
        this.fromId = fromId;
    }

    public String getToId() {
        return toId;
    }

    public void setToId(String toId) {
        this.toId = toId;
    }



    @Override
    public Document toDocument() {
        return new Document()
                .append("friendId", friendId)
                .append("fromId", fromId)
                .append("toId", toId);
    }

    public static FriendDto fromDocument(Document match) {
        var friendDto = new FriendDto();
        friendDto.setFriendId(match.getString("friendId"));
        friendDto.setFromId(match.getString("fromId"));
        friendDto.setToId(match.getString("toId"));
        
        return friendDto;
    }
}
