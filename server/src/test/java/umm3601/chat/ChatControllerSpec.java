package umm3601.chat;

import com.mongodb.BasicDBObject;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.*;
import org.bson.types.ObjectId;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.Assert.assertEquals;
import static umm3601.DatabaseHelper.*;

public class ChatControllerSpec {
  private ChatController chatController;
  private ObjectId testChatId;

  @Before
  public void clearAndPopulateDB() {
    MongoClient mongoClient = new MongoClient();
    MongoDatabase db = mongoClient.getDatabase("test");
    MongoCollection<Document> chatDocuments = db.getCollection("chats");
    chatDocuments.drop();

    List<String> testMessages = new ArrayList<>();
    testMessages.add("{\n" +
      "                    sender: \"Andy Weller\",\n" +
      "                    body: \"Is there any chance of leaving 15 minutes late?\",\n" +
      "                    sent: \"2008-09-15T15:53:00\"}");
    testMessages.add("{\n" +
      "                    sender: \"Brianna Hart\",\n" +
      "                    body: \"Following this\",\n" +
      "                    sent: \"2008-09-15T15:59:00\"}");
    testMessages.add("{\n" +
      "                    sender: \"Christina Feller\",\n" +
      "                    body: \"Yes that works for me- I'll pick you up @ the Student Center :)\",\n" +
      "                    sent: \"2008-09-15T16:00:00\"}");

    List<Document> testChats = new ArrayList<>();
    testChats.add(Document.parse("{\n" +
      "                    total_messages: \"4\",\n" +
      "                    messages: " +
                           Arrays.toString(testMessages.toArray()) + ",\n" +
      "                }"));

    testChatId = new ObjectId();
    BasicDBObject testChat = new BasicDBObject("_id", testChatId);
    testChat = testChat.append("sender", "Dylan Hogan")
      .append("messages", Arrays.toString(testMessages.toArray()))
      .append("total_messages", 3);

    chatDocuments.insertMany(testChats);
    chatDocuments.insertOne(Document.parse(testChat.toJson()));

    chatController = new ChatController(db);
  }

  private static String getMessageSender(BsonValue val) {
    BsonDocument message = val.asDocument();
    return ((BsonString) message.get("sender")).getValue();
  }

  @Test
  public void getChatById() {
    String jsonChat = chatController.getChat(testChatId.toHexString());
    Document testChat = Document.parse(jsonChat);

    assertEquals("Total messages should be correct", 3, testChat.get("total_messages"));

    String jsonMessages = chatController.getMessages(testChatId.toHexString());
    BsonArray docs = parseJsonArray(jsonMessages);

    List<String> messageSenders = docs
      .stream()
      .map(ChatControllerSpec::getMessageSender)
      .sorted()
      .collect(Collectors.toList());
    assertEquals("First driver's name should be Andy Weller", "Andy Weller", messageSenders.get(0));
  }
}
