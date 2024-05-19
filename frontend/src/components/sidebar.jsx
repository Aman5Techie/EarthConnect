import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {

  UserCircleIcon,
  InboxIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

export default function Sidebar({setpage}) {
  const [open, setOpen] = React.useState(0);
  const navigate = useNavigate();
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  
  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Sidebar
        </Typography>
      </div>
      <List>
        
        <ListItem onClick={()=>{setpage(1)}} className="text-lg" >
          <ListItemPrefix>
            <InboxIcon className="h-7 w-7" />
          </ListItemPrefix>
          Create Post
          {/* <ListItemSuffix >
            <Chip
              value="14"
              size="sm"
              variant="ghost"
              color="blue-gray"
              className="rounded-full"
            />
          </ListItemSuffix> */}
        </ListItem>
        <ListItem  onClick={()=>{navigate("/profile")}}  className="text-lg">
          <ListItemPrefix>
            <UserCircleIcon className="h-7 w-7" />
          </ListItemPrefix>
          Profile
        </ListItem>
      
        {/* <ListItem className="text-lg">
          <ListItemPrefix>
            <PowerIcon className="h-7 w-7" />
          </ListItemPrefix>
          Log Out
        </ListItem> */}
      </List>
    </Card>
  );
}
