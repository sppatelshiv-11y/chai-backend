import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose";
const viedoSchema = new Schema(
    {
        viedoFile:{
         type: String,
         required: true,

        },
        thumbmail:{
            type: String,
            required: true
        },
        tital:{
            type: String,
            required: true
        },
             description:{
            type: String,
            required: true
        },
        qulity:{
            type: String,
            required: true
        },
        duration:{
            type: Number,
            required: true

        },
        views:{
            type: Number,
            default:0,   
        },

        ispublished:{
            type:Boolean,
            default: true
        },
        owner:{
            type: Schema.Types.ObjectId,
            ref:"user"
        }

},
{
timestamps:true
}
)


export const viedo = mongoose.model("viedo",viedoSchema)