import { Schema, model, models } from 'mongoose';

const PromptSchema = new Schema({
  prompt: {
    type: String,
    required: [true, 'Prompt is required.'],
  },
  tag: {
    type: String,
    required: [true, 'Tag is required.'],
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

export default models.Prompt || model('Prompt', PromptSchema);
