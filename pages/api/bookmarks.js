import clientPromise from '../../lib/mongodb';

const bookmarks = async (req, res) => {
  const client = await clientPromise;
  const db = client.db('myFirstDatabase');
  switch (req.method) {
    case 'POST':
      // let bodyObject = JSON.parse(req.body);
      let newBookmark = await db.collection('bookmarks').insertOne(req.body);
      res.json(newBookmark.insertedId);
      break;
    case 'GET':
      const bookmarks = await db.collection('bookmarks').find({}).toArray();
      res.json({ status: 200, bookmarks });
      break;
  }
};

export default bookmarks;
