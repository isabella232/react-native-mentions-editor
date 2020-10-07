import React from "react";
import PropTypes from "prop-types";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleProp,
  ViewStyle,
} from "react-native";

// Styles
import styles from "./MentionListItemStyles";

import Avatar from "../Avatar";
import { MentionUser } from "../types";
import { EditorStylesProps } from "../Editor";

interface Props {
  item: MentionUser;
  onSuggestionTap: (user: MentionUser) => void;
  editorStyles: EditorStylesProps;
  renderAvatar?(avatar: string): {};
}

export class MentionListItem extends React.PureComponent<Props> {
  onSuggestionTap = (user: MentionUser) => {
    this.props.onSuggestionTap(user);
  };

  renderAvatar = (user: MentionUser) => {
    if (this.props.renderAvatar && user.avatar) {
      return this.props.renderAvatar(user.avatar);
    }
    if (user.avatar) {
      return <Image source={{ uri: user.avatar }} style={styles.avatarImage} />;
    } else {
      return (
        <Avatar
          user={user}
          wrapperStyles={styles.thumbnailWrapper}
          charStyles={styles.thumbnailChar}
        />
      );
    }
  };

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
            <Text style={[styles.title, editorStyles.mentionListItemUsername]}>
              @{user.username}
            </Text>
            {user.name ? (
              <Text style={[editorStyles.mentionListItemTitle]}>
                {user.name}
              </Text>
            ) : null}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default MentionListItem;
