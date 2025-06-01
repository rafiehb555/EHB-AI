import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.models.Notification || mongoose.model('Notification', NotificationSchema); 