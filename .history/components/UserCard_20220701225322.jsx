import React from "react";
import { User, Row, Col, Text, Button, Spacer, Grid } from "@nextui-org/react";
import { useSession } from "next-auth/react";

export const UserCard = ({post,follow,hasFollowed,setHasFollowed}) => {
  const [following, setFollowing] = React.useState(false);
  const {data:session} = useSession()
  return (
    <Grid.Container
      className="user-twitter-card__container"
      css={{
        mw: "300px",
        borderRadius: "$lg",
        padding: "$sm",
      }}
    >
      <Row justify="space-around" align="center">
        <Col span={8}>
          <User
            src={post.data().userImg}
            name={post.data().name}
            description={post.data()?.email}
            css={{ px: 0 }}
          />
        </Col>
        <Col span={4}>
          <Row>
            <Button
              auto
              rounded
              onClick={() =>{
               
                setHasFollowed(!following)
              } 
            }
            onPress={ follow}
              css={{
                maxHeight: "$space$12",
                fs: "$xs",
                fontWeight: "$semibold",
                borderColor: hasFollowed ? "$foreground" : "$primary",
                color: hasFollowed ? "$foreground" : "$white"
              }}
              color="primary"
              bordered={hasFollowed}
            >
              {hasFollowed ? "Unfollow" : "Follow"}
            </Button>
          </Row>
        </Col>
      </Row>
      <Grid.Container className="user-twitter-card__username-container">
        <Grid xs={12}>
          <Text
            className="user-twitter-card__text"
            size={14}
            css={{ mt: "$1" }}
            color="#888888"
          >
            Full-stack developer, @getnextui lover she/her 🎉
          </Text>
        </Grid>
      </Grid.Container>

      <Grid.Container
        className="user-twitter-card__metrics-container"
        justify="flex-start"
        alignContent="center"
      >
        <Text className="user-twitter-card__text" size={14} color="#888888">
          <Text
            b
            color="foreground"
            className="user-twitter-card__text"
            size={14}
          >
            4
          </Text>
           Following
        </Text>
        <Spacer inline x={0.5} />
        <Text className="user-twitter-card__text" size={14} color="#888888">
          <Text
            b
            color="foreground"
            className="user-twitter-card__text"
            size={14}
          >
            97.1K
          </Text>
           Followers
        </Text>
      </Grid.Container>
    </Grid.Container>
  );
};
