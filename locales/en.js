export default {
  "model": {
    "user": {
      "model_name": "Profile",
      "name": "User Name",
      "image": "Icon",
      "email": "E-mail",
      "password": "Password",
      "password_confirmation": "Password (confirmation)"
    },
    "frame": {
      "model_name": "",
      "name": "Name",
      "file": "File",
      "tag_list": "Tags",
      "shooted_at": "Shooting Date",
      "comment": "Comment"
    },
    "comment": {
      "model_name": "Comment",
      "body": "Comment"
    }
  },
  "component": {
    "tag_search": {
      "placeholder": "Tag or Name or Date",
      "search": "Search"
    }
  },
  "action": {
    "model": {
      "create": "Regist",
      "update": "Edit",
      "delete": "Delete",
      "return": "Back"
    },
    "user": {
      "login": "Sign In",
      "logout": "Sign Out",
      "delete": "Delete",
      "new": "User Registration",
      "follow": "Follow",
      "unfollow": "Now following"
    },
    "frame": {
      "upload": "Upload"
    },
    "comment": {
      "post": "Post",
      "required": "Required."
    },
    "modal": {
      "close": "Close",
      "delete": {
        "message": "Are you sure you want to delete it?"
      },
      "user": {
        "delete": {
          "message": "Are you sure you want to delete account?"
        }
      }
    },
    "error": {
      "login": "Please login.",
      "email": {
        "duplicated": "Your e-mail address is aleady registered"
      }
    }
  }
}