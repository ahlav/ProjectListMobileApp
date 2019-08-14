/* global fetch:false */
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  AsyncStorage, ScrollView,
} from 'react-native';
import {colors, fonts} from '../../styles';
import * as ENVIRONMENT from "../Environment";
import RNSRadioGroup from "../../components/RadioGroup";

export default class ProjectsScreen extends React.Component {
  state = {
    data: null,
    index: 0,
  };

  componentDidMount() {
    this.setDataFromFetch(this.state.index);
  }

  _openProjectDetail = details => {
    this.props.navigation.navigate({
      routeName: 'ProjectDetail',
      params: {...details},
    });
  };

  setDataFromFetch = index => {
    const dueInHours = `&dueInHours=${this.getDueParam(index)}`;
    AsyncStorage.getItem('token', (err, tokenFromStorage) =>
      fetch(`${`${ENVIRONMENT.CLIENT_API}/web/api2/v1/projects?token=`}${tokenFromStorage}${dueInHours}`)
        .then(response => response.json())
        .then(stringValue => JSON.stringify(stringValue))
        .then(objectValue => JSON.parse(objectValue))
        .then(data => this.setState({data: data.content})))
  };

  getDueParam = parameter => {
    switch (parameter) {
      case 1:
        return 4;
      case 2:
        return 8;
      case 3:
        return 24;
      case 4:
        return 72;
      default:
        return 0;
    }
  };

  renderProjectList = ({item: project}) => (
    <TouchableOpacity
      key={project.id}
      style={styles.projectContainer}
      onPress={() => this._openProjectDetail(project)}
    >
      <View style={styles.projectSubContainer}>
        <View style={styles.projectContent}>
          <View>
            <Text style={styles.projectTitle}>{project.name}</Text>
          </View>
          <View style={styles.projectMetaContainer}>
            <View style={[styles.badge, project.status === 'NEW' && {backgroundColor: colors.secondary} ||
            project.status === 'COMPLETED' && {backgroundColor: colors.green} ||
            project.status === 'CANCELLED' && {backgroundColor: colors.gray},]}
            >
              <Text style={{fontSize: 10, color: colors.white}} styleName="bright">{project.status}</Text>
            </View>
            <View>
              <Text style={styles.projectLangs}>Source language: {project.sourceLang}</Text>
              <Text style={styles.projectLangs}>Target language(s): {(project.targetLangs.toString())}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.projectHr} />
    </TouchableOpacity>
  );

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <RNSRadioGroup
            underline
            style={styles.radioButton}
            items={['any', '4', '8', '24', '72']}
            selectedIndex={this.state.index}
            onChange={index => {
              this.setState({index});
              this.setDataFromFetch(index);
            }}
          />
          <FlatList
            keyExtractor={item => `${item.id}`}
            style={{backgroundColor: colors.white, paddingHorizontal: 15}}
            data={this.state.data}
            renderItem={this.renderProjectList}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: 10,
  },
  radioButton: {
    marginVertical: 10,
  },
  projectContainer: {
    backgroundColor: 'white',
  },
  projectSubContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  projectContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  projectTitle: {
    fontFamily: fonts.primaryBold,
    fontSize: 16,
    color: '#5F5F5F',
  },
  projectMetaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  projectLangs: {
    fontFamily: fonts.primaryRegular,
    fontSize: 13,
    color: '#5f5f5f',
    textAlign: 'right',
  },
  projectHr: {
    flex: 1,
    height: 1,
    backgroundColor: '#e3e3e3',
    marginRight: -15,
  },
  badge: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
