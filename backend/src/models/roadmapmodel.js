import mongoose from 'mongoose';

const RoadmapSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  phases: {           // <-- use 'phases' here
    type: Array
  }
});

const Roadmapmodel = mongoose.model('Roadmap', RoadmapSchema);

export default Roadmapmodel;
