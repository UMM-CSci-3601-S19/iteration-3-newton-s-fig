package umm3601.chat;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.bson.types.ObjectId;

import java.util.Iterator;

import static com.mongodb.client.model.Filters.eq;

public class ChatController {

  private final MongoCollection<Document> chatCollection;

  /**
   * Construct a controller for chats.
   *
   * @param database the database containing ride data
   */
  public ChatController(MongoDatabase database) {
    chatCollection = database.getCollection("chats");
  }

  /**
   * Helper method that gets a chat by the `id` passed in
   * @param id the Mongo ID of the desired chat
   * @return the desired chat as a JSON object if the chat exists, else return `null`
   */
  public String getChat(String id) {
    FindIterable<Document> jsonChats
      = chatCollection
      .find(eq("_id", new ObjectId(id)));

    Iterator<Document> iterator = jsonChats.iterator();
    if (iterator.hasNext()) {
      Document chat = iterator.next();
      return chat.toJson();
    } else {
      return null;
    }
  }

  public String getMessages(String id) {
    Document chat = Document.parse(getChat(id));
    return chat.get("messages").toString();
  }
}
