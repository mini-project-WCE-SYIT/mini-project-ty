import { Box } from "@mui/material";
import { styled } from "@mui/system";

const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export default FlexBetween;
/*
const handlePost = async () => {
  const formData = new FormData();
  formData.append("userId", _id);
  formData.append("description", shortDescription);
  formData.append("eventName", eventName);
  formData.append("activityType", activityType);
  formData.append("location", location);
  formData.append("date", date);
  formData.append("organizedBy", organizedBy);
  if (image) {
    formData.append("picture", image);
    formData.append("picturePath", image.name);
  }

  const response = await fetch(`${process.env.REACT_APP_URL}/posts`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  const posts = await response.json();
  dispatch(setPosts({ posts }));
  setImage(null);
  setEventName("");
  setActivityType("");
  setShortDescription("");
  setLocation("");
  setDate("");
  setOrganizedBy("");

  
};
*/