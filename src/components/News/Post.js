import {
  Card,
  CardActionArea,
  CardContent,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";

const PostCard = styled(Card)({
  marginBottom: (theme) => theme.spacing(3),
  "@media (max-width: 600px)": {
    width: 400,
  },
});

export default function Post({ article }) {
  const { title, content, date, author, source, category } = article;

  return (
    <PostCard>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5">
            {title}
          </Typography>
          <Typography variant="body2">{content}</Typography>

          <List>
            <ListItem>
              <Typography variant="body2">
                <strong>Date:</strong> {date}
              </Typography>
            </ListItem>
            <ListItem>
              {author && (
                <Typography variant="body2">
                  <strong>Author:</strong> {author?.name}
                </Typography>
              )}
            </ListItem>
            <ListItem>
              {source && (
                <Typography variant="body2">
                  <strong>Source:</strong> {source?.name}
                </Typography>
              )}
            </ListItem>
            <ListItem>
              {category && (
                <Typography variant="body2">
                  <strong>Category:</strong> {category?.name}
                </Typography>
              )}
            </ListItem>

          </List>
        </CardContent>
      </CardActionArea>
    </PostCard>
  );
}
