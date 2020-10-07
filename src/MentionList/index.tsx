import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Animated,
  View,
  ScrollViewProps,
} from "react-native";

import MentionListItem from "../MentionListItem";
// Styles
import styles from "../MentionList/MentionListStyles";
import { MentionUser } from "../types";
import { EditorStylesProps } from "../Editor";

interface Props {
  list: MentionUser[];
  editorStyles: EditorStylesProps;
  isTrackingStarted: boolean;
  keyword: string;
  onSuggestionTap: (user: MentionUser) => void;
  mentionsListProps: ScrollViewProps;
}

export class MentionList extends React.PureComponent<Props> {
  static defaultProps: Props = {
    list: [],
    editorStyles: {},
    isTrackingStarted: false,
    keyword: "",
    onSuggestionTap: () => {},
    mentionsListProps: {},
  };

  previousChar = " ";

  renderSuggestionsRow = ({ item }: { item: MentionUser }) => {
    return (
      <MentionListItem
        onSuggestionTap={this.props.onSuggestionTap}
        item={item}
        editorStyles={this.props.editorStyles}
      />
    );
  };

  render() {
    const { props } = this;

    const { keyword, isTrackingStarted } = props;
    const withoutAtKeyword = keyword.substr(1, keyword.length);
    const list = this.props.list;
    const suggestions =
      withoutAtKeyword !== ""
        ? list.filter((user) => user.username.includes(withoutAtKeyword))
        : list;
    if (!isTrackingStarted) {
      return null;
    }
    return (
      <Animated.View
        style={[
          { ...styles.suggestionsPanelStyle },
          this.props.editorStyles.mentionsListWrapper,
        ]}
      >
        <FlatList
          {...props.mentionsListProps}
          style={styles.mentionsListContainer}
          keyboardShouldPersistTaps={"always"}
          ListEmptyComponent={
            <View style={styles.loaderContainer}>
              <ActivityIndicator />
            </View>
          }
          //enableEmptySections={true}
          data={suggestions}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={this.renderSuggestionsRow}
        />
      </Animated.View>
    );
  }
}

export default MentionList;
