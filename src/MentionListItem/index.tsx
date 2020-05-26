import React from "react";
import PropTypes from "prop-types";
import { Text, View, TouchableOpacity, Image } from "react-native";

// Styles
import styles from "./MentionListItemStyles";

import Avatar from "../Avatar";

interface Props {
  item: any,
  onSuggestionTap: Function,
  editorStyles: any,
  renderAvatar?(avatar: string): {}
}

export class MentionListItem extends React.PureComponent<Props> {
  static propTypes = {
    item: PropTypes.object,
    onSuggestionTap: PropTypes.func,
    editorStyles: PropTypes.object
  };

  onSuggestionTap = (user) => {
    this.props.onSuggestionTap(user);
  };

  renderAvatar = (user) => {
    if (this.props.renderAvatar) {
      return this.props.renderAvatar(user.avatar);
    }
    if (user.avatar) {
      return <Image source={{ uri: user.avatar }} style={styles.avatarImage} />
    } else {
      return <Avatar
        user={user}
        wrapperStyles={styles.thumbnailWrapper}
        charStyles={styles.thumbnailChar}
      />
    }
  }

  render() {
    const { item: user, editorStyles } = this.props;
    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.suggestionItem, editorStyles.mentionListItemWrapper]}
          onPress={() => this.onSuggestionTap(user)}
        >

          {this.renderAvatar(user)}

          <View style={[styles.text, editorStyles.mentionListItemTextWrapper]}>
            <Text
              style={[styles.title, editorStyles.mentionListItemUsername]}
            >
              @{user.username}
            </Text>
            {user.name ? <Text style={[editorStyles.mentionListItemTitle]}>
              {user.name}
            </Text> : null}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default MentionListItem;
