import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link as RouterLink } from "react-router-dom";
import { fDate } from "../../utils/formatTime";

import {
  Box,
  Link,
  Card,
  Stack,
  Avatar,
  Typography,
  CardHeader,
  Button,
} from "@mui/material";

import PostReaction from "./PostReaction";
import EditPostModal from "./EditPostModal";
import CommentForm from "../comment/CommentForm.js";
import CommentList from "../comment/CommentList";

import DeletePostModal from "./DeletePostModal";

function PostCard({ post, userId }) {
  const { user } = useAuth();
  console.log(user._id, userId);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleOpenEditModal = () => setOpenEditModal(true);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);

  const ModalButtons = (
    <>
      <Button variant="contained" onClick={handleOpenDeleteModal}>
        Delete
      </Button>
      <Button variant="contained" onClick={handleOpenEditModal}>
        Edit
      </Button>
    </>
  );

  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={
          <Avatar src={post?.author?.avatarUrl} alt={post?.author?.name} />
        }
        title={
          <Link
            variant="subtitle2"
            color="text.primary"
            component={RouterLink}
            sx={{ fontWeight: 600 }}
            to={`/user/${post.author._id}`}
          >
            {post?.author?.name}
          </Link>
        }
        subheader={
          <Typography
            variant="caption"
            sx={{ display: "block", color: "text.secondary" }}
          >
            {fDate(post.createdAt)}
          </Typography>
        }
      />

      {/* Popup window for Edit Post */}
      {openEditModal && (
        <EditPostModal
          post={post}
          openEditModal={openEditModal}
          setOpenEditModal={setOpenEditModal}
        />
      )}

      {/* Popup window for Delete Post comfirm */}
      {openDeleteModal && (
        <DeletePostModal
          post={post}
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
        />
      )}

      {/* Display Status and Image */}
      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography>{post.content}</Typography>

        {post.image && (
          <Box
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              height: 300,
              "& img": { objectFit: "cover", width: 1, height: 1 },
            }}
          >
            <img src={post.image} alt="post" />
          </Box>
        )}
        <PostReaction post={post} />
        {ModalButtons}

        <CommentList postId={post._id} />
        <CommentForm postId={post._id} />
      </Stack>
    </Card>
  );
}

export default PostCard;
