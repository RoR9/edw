import mongoose, { Schema, Document } from "mongoose";

export interface IDocument {
  issue: Date; // Adjust type if needed
  expiry: Date; // Adjust type if needed
}

export interface ICar extends Document {
  plate_number: string;
  enabled: boolean;
  documents: {
    inspection: IDocument;
    insurance: IDocument;
    vignette: IDocument;
  };
}

const carSchema = new Schema<ICar>(
  {
    plate_number: {
      type: String,
      unique: true,
      required: true,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
    documents: {
      inspection: {
        type: Object,
        default: {
          issue: null,
          expiry: null,
        },
      },
      insurance: {
        type: Object,
        default: {
          issue: null,
          expiry: null,
        },
      },
      vignette: {
        type: Object,
        default: {
          issue: null,
          expiry: null,
        },
      },
    },
  },
  { timestamps: true }
);

const Car = mongoose.models?.Car ?? mongoose.model<ICar>("Car", carSchema);

export default Car;
