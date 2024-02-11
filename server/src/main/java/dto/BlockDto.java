package dto;

import org.bson.Document;

public class BlockDto extends BaseDto{
    private String fromId;
    private String toId;
    private String blockId;

    public String getFromId() {return fromId;}
    public String getToId() {return toId;}
    public String getBlockId() {return blockId;}

    public void setFromId(String fromId) {this.fromId = fromId;}
    public void setToId(String toId) {this.toId = toId;}
    public void setBlockId(String blockId) {this.blockId = blockId;}

    @Override
    public Document toDocument() {
        return new Document()
                .append("fromId", fromId)
                .append("toId", toId)
                .append("blockId", blockId);
    }

    public static BlockDto fromDocument(Document match) {
        var blockDto = new BlockDto();
        blockDto.setFromId(match.getString("fromId"));
        blockDto.setToId(match.getString("toId"));
        blockDto.setBlockId(match.getString("blockId"));
        return blockDto;
    }
}