import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";

function HomPage(props) {
  return <MeetupList meetups={props.meetups} />;
}

//fetch data
export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://Ngocthe1:Ngocthe1@cluster0.kucby.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
  };
}
export default HomPage;
