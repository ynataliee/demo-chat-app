package dto;

import org.bson.Document;
// use abstract class instead of interface because interfaces are stateless, they have no instance
// variables, but here we have a String field uniqueId
public abstract class BaseDto{

  private String uniqueId;

  public BaseDto(String uniqueId) {
    this.uniqueId = uniqueId;
  }

  public BaseDto() {
  }

  public String getUniqueId(){
    return uniqueId;
  }

  public abstract Document toDocument();

}
