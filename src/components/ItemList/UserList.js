import React from 'react';
import {
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button,
} from 'native-base';

export const UserList = (props) => {
  const {name, condition, quantity} = props;
  return (
    <ListItem thumbnail>
      <Left>
        <Thumbnail
          square
          source={{
            uri: 'http://robohash.org/set_set1/bgset_bg2/kQqaIfGqxsjFoNIT',
          }}
        />
      </Left>
      <Body>
        <Text>{name}</Text>
        <Text note numberOfLines={1}>
          {`Quantity: ${quantity}, Condition: ${condition}`}
        </Text>
      </Body>
      <Right>
        <Button transparent>
          <Text>Edit</Text>
        </Button>
      </Right>
    </ListItem>
  );
};
