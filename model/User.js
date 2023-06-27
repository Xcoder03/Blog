import mongoose, {Schema} from  "mongoose"

const userSchema = new mongoose.Schema({

     firstname:{
        type: String,
        required: [true, "First name is required"],
     },


     lastname: {
        type: String,
        required: [true, "lastname name is required"],
      },
      profilephoto: {
        type: String,
      },
      email: {
        type: String,
        required: [true, "Email is required"],
      },
      password: {
        type: String,
        required: [true, "password is required"],
      },
      isBlocked: {
        type: Boolean,
        default: false,
      },
      isAdmin: {
        type: Boolean,
        default: false,
      },
      role: {
        type: String,
        enum: ["Admin", "Editor", "Guest"],
        default:"Guest"
      },
      views: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      followers: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        }
      ],
      following: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        }
      ],
    
      blocked:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
      ],
      posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post"
        }
      ],
      comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
      ],
      award:{
        type:String,
        emum:["Bronze","Silver","Gold"],
        default:"Bronze",
      },


      resetToken: {
        type: String,
      },
  
      reseTokenExpiration: {
        type: Date,
      },

      subscription: {
        totalAmount: {
          type: Number,
          default: 0.0,
        },
        payment_status: {
          type: String,
          default: "not_paid",
        },
        paymentMethod: {
          type: String,
        },
        currency: {
          type: String,
        },
        subscriptionDate: {
          type: Date,
        },
        transationId: {
          type: String,
        },
        expirationDate: {
          type: Date,
        },
        approved: {
          type: String,
          default: "pending",
        },
      },


},{ 
    timestamps:true,
    toJSON:{virtuals:true}
});

userSchema.virtual("fullname").get(function () {
  return `${this.firstname}  ${this.lastname}`;
});

userSchema.virtual("postCounts").get(function () {
  return this.posts.length;
});

userSchema.virtual("followercount").get(function () {
  return this.followers.length;
});

userSchema.virtual("followingcount").get(function () {
  return this.following.length;
});


const User = mongoose.model("User",userSchema);
export default User