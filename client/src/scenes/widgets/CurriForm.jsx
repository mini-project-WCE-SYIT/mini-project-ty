import React from 'react'
import TextField from '@mui/material/TextField';
import {
	EditOutlined,
	DeleteOutlined,
	AttachFileOutlined,
	GifBoxOutlined,
	ImageOutlined,
	MicOutlined,
	MoreHorizOutlined,
} from "@mui/icons-material";
import {
	Box,
	Divider,
	Typography,
	InputBase,
	useTheme,
	Button,
	IconButton,
	useMediaQuery,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import FlexCol from "components/FlexColm";


const CurriForm = ({picturePath}) => {
	const [isAchieved,setIsAchieved]=useState(0);
	const dispatch = useDispatch();
	const [isImage, setIsImage] = useState(false);
	const [image, setImage] = useState(null);
	const [eventName, setEventName] = useState("");
	const [activityType, setActivityType] = useState("");
	const [shortDescription, setShortDescription] = useState("");
	const [location, setLocation] = useState("");
	const [date, setDate] = useState("");
	const [organizedBy, setOrganizedBy] = useState("");
	const { palette } = useTheme();
	const { _id } = useSelector((state) => state.user);
	const token = useSelector((state) => state.token);
	const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
	const mediumMain = palette.neutral.mediumMain;
	const medium = palette.neutral.medium;

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
  return (
    <div>
      <WidgetWrapper>
			<FlexCol gap='1.5rem'>
				<UserImage image={picturePath} />
				<FlexBetween gap='2rem'>
					<FlexCol gap='1.5rem'>
						<TextField placeholder='Name of the event' id="standard-basic" variant="standard"
							onChange={(e) => setEventName(e.target.value)}
							value={eventName} />

						<TextField id="standard-basic" variant="standard" placeholder='Activity Type'
							onChange={(e) => setActivityType(e.target.value)}
							value={activityType} />

						<TextField id="standard-basic" variant="standard"
							placeholder='Short Description'
							onChange={(e) => setShortDescription(e.target.value)}
							value={shortDescription} />
					</FlexCol>
					<FlexCol gap='1.5rem'>
						<TextField id="standard-basic" variant="standard"
							placeholder='Location'
							onChange={(e) => setLocation(e.target.value)}
							value={location} />

						<TextField id="standard-basic" variant="standard" 
							placeholder='Date'
							// type='Date'
							onChange={(e) => setDate(e.target.value)}
							value={date} />

						<TextField id="standard-basic" variant="standard"
							placeholder='Organized By'
							onChange={(e) => setOrganizedBy(e.target.value)}
							value={organizedBy} />
					</FlexCol>
				</FlexBetween>
			</FlexCol>
			{isImage && (
				<Box
					border={`1px solid ${medium}`}
					borderRadius='5px'
					mt='1rem'
					p='1rem'>
					<Dropzone
						acceptedFiles='.jpg,.jpeg,.png'
						multiple={false}
						onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}>
						{({ getRootProps, getInputProps }) => (
							<FlexBetween>
								<Box
									{...getRootProps()}
									border={`2px dashed ${palette.primary.main}`}
									p='1rem'
									width='100%'
									sx={{ "&:hover": { cursor: "pointer" } }}>
									<input {...getInputProps()} />
									{!image ? (
										<p>Add Image Here</p>
									) : (
										<FlexBetween>
											<Typography>{image.name}</Typography>
											<EditOutlined />
										</FlexBetween>
									)}
								</Box>
								{image && (
									<IconButton
										onClick={() => setImage(null)}
										sx={{ width: "15%" }}>
										<DeleteOutlined />
									</IconButton>
								)}
							</FlexBetween>
						)}
					</Dropzone>
				</Box>
			)}

			<Divider sx={{ margin: "1.25rem 0" }} />

			<FlexBetween>
				<FlexBetween gap='0.25rem' onClick={() => setIsImage(!isImage)}>
					<ImageOutlined sx={{ color: mediumMain }} />
					<Typography
						color={mediumMain}
						sx={{ "&:hover": { cursor: "pointer", color: medium } }}>
						Image
					</Typography>
				</FlexBetween>

				{isNonMobileScreens ? (
					<>
						<FlexBetween gap='0.25rem'>
							<GifBoxOutlined sx={{ color: mediumMain }} />
							<Typography color={mediumMain}>Clip</Typography>
						</FlexBetween>

						<FlexBetween gap='0.25rem'>
							<AttachFileOutlined sx={{ color: mediumMain }} />
							<Typography color={mediumMain}>Attachment</Typography>
						</FlexBetween>

						<FlexBetween gap='0.25rem'>
							<MicOutlined sx={{ color: mediumMain }} />
							<Typography color={mediumMain}>Audio</Typography>
						</FlexBetween>
					</>
				) : (
					<FlexBetween gap='0.25rem'>
						<MoreHorizOutlined sx={{ color: mediumMain }} />
					</FlexBetween>
				)}

				<Button
					disabled={!shortDescription}
					onClick={handlePost}
					sx={{
						color: palette.background.alt,
						backgroundColor: palette.primary.main,
						borderRadius: "3rem",
					}}>
					POST
				</Button>
			</FlexBetween>
		</WidgetWrapper>
    </div>
  )
}

export default CurriForm
