import { View, Text, FlatList, Dimensions } from 'react-native'
import React, { useContext, useEffect, useRef } from 'react'
import PlaceItem from './PlaceItem';
import { SelectedMarkerContext } from '../../Context/SelectedMarkerContext';

export default function PlaceListView({ placeList }) {
    console.log("***", placeList);
    const flatListRef = useRef(null);
    const { selectedMarker } = useContext(SelectedMarkerContext);
    
    useEffect(() => {
      selectedMarker !== null && scrollToIndex(selectedMarker);
    }, [selectedMarker]);
  
    const scrollToIndex = (index) => {
      if (index >= 0 && index < placeList.length) {
        flatListRef.current?.scrollToIndex({ animated: true, index });
      }
    };
  
    const getItemLayout = (_, index) => ({
      length: Dimensions.get('window').width,
      offset: Dimensions.get('window').width * index,
      index
    });
  
    return (
      <View>
        <FlatList
          data={placeList}
          horizontal={true}
          pagingEnabled
          ref={flatListRef}
          getItemLayout={getItemLayout}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View key={index}>
              <PlaceItem place={item} />
            </View>
          )}
        />
      </View>
    );
  }
  