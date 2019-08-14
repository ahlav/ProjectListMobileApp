import React from 'react';
import {StyleSheet, View} from 'react-native';

import {colors, fonts} from '../../styles';
import {Text} from "../../components/StyledText";

export default function ProjectDetailScreen(props) {
  const renderDetails = project => (
    <View style={styles.projectSubContainer}>
      <View style={styles.projectContent}>
        <View>
          <Text style={styles.projectTitle}>{project.name}</Text>
        </View>
        <View style={styles.projectStatus}>
          <View style={styles.row}>
            <Text> Status: </Text>
            <View style={[styles.badge, project.status === 'NEW' && {backgroundColor: colors.secondary} ||
            project.status === 'COMPLETED' && {backgroundColor: colors.green} ||
            project.status === 'CANCELLED' && {backgroundColor: colors.gray},]}
            >
              <Text style={{fontSize: 10, color: colors.white}} styleName="bright">{project.status}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <View style={styles.row}>
            <Text style={styles.label}>Created by: </Text>
            <Text style={styles.input}>{project.createdBy.firstName} {project.createdBy.lastName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Purchase Order: </Text>
            <Text style={styles.input}>{project.purchaseOrder}</Text>
          </View>
          <View style={{margin: 7}} />
          <View style={styles.row}>
            <Text style={styles.label}>Source language: </Text>
            <Text style={styles.input}>{project.sourceLang}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Target language(s): </Text>
            <Text style={styles.input}>{(project.targetLangs.toString())}</Text>
          </View>
          <View style={{margin: 7}} />
          <View style={styles.row}>
            <Text style={styles.label}>Date created: </Text>
            <Text style={styles.input}>{(project.dateCreated)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Due Date: </Text>
            <Text style={styles.input}>{(project.dateDue)}</Text>
          </View>
          <View style={{margin: 7}} />
          <View style={styles.row}>
            <Text style={styles.label}>Owner: </Text>
            <Text style={styles.input}>{project.owner.userName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Note: </Text>
            <Text style={styles.input}>{project.note}</Text>
          </View>
        </View>
      </View>
    </View>
  );
  return renderDetails(props.navigation.state.params);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  label: {
    fontFamily: fonts.primaryBold,
    alignItems: 'flex-end'
  },
  row: {
    flexDirection: 'row'
  },
  projectStatus: {
    alignItems: 'flex-end'
  },
  projectSubContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  projectContent: {
    flex: 1,
    paddingHorizontal: 15,
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
  input: {
    fontFamily: fonts.primaryRegular,
    fontSize: 13,
    color: '#5f5f5f',
    textAlign: 'right',
    alignItems: 'flex-start'
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
