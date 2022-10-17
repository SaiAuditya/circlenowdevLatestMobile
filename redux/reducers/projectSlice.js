import { createSlice } from '@reduxjs/toolkit';
import { CommunityData } from '../../assets/constants/dummy'
import makeid from './helper'
import { assets } from '../../assets/constants';

const initialState = {
  communities: CommunityData,
  userJoinedCommunities: [],
  searchedLoc: {},
  showInitiaImage: true,
  showSearchResults: false,
  showAddCommunity: false,
  userJoinedCommunityIds: [],
  loggedInUser: '',
  loggedInUserGuid: 'SA',
  isLoggedIn: false,
  photoUrl: '',
  userInitials: '',
  isPhoneValidationDone: false,
  loggedInUserEmail: '',
  token: '',
  selectedSpace: 'All'
};

export const communitiesSlice = createSlice({
  name: 'communities',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setDefaultCommunities: (state, action) => {
      //console.log(action.payload)
      state.showSearchResults = false;
      //console.log(action.payload)
      state.communities = CommunityData.filter(comm => comm.address === action.payload.formatted_address)
      if (state.userJoinedCommunities.length > 0)
        state.communities = state.communities.concat(state.userJoinedCommunities)

      if (state.communities.length > 0) {
        state.showSearchResults = true;
        state.showInitiaImage = false;
      } else {
        state.showAddCommunity = true;
        state.showInitiaImage = false;
        state.showSearchResults = false;

        state.searchedLoc = action.payload;
      }
    },
    reset: (state) => {
      state.showAddCommunity = false
      state.showSearchResults = false
      state.showInitiaImage = true
    },
    addCommunity: (state, action) => {
      action.payload.id = makeid(5)
      action.payload.alerts = 2
      action.payload.messages = 3
      action.payload.image = assets.farmland1
      state.userJoinedCommunities = state.userJoinedCommunities.concat(action.payload)
      state.userJoinedCommunityIds = state.userJoinedCommunityIds.concat(action.payload.id)
      state.showSearchResults = true;
      state.showAddCommunity = false;
      state.communities = state.userJoinedCommunities
      //state.userJoinedCommunityIds = state.userJo
      console.log(state.userJoinedCommunityIds.toString())
    },
    joinCommunity: (state, action) => {
      state.userJoinedCommunityIds = state.userJoinedCommunityIds.concat(action.payload)
    },
    setLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload;
      state.isLoggedIn = true
    },
    setLoggedInUserEmail: (state, action) => {
      state.loggedInUserEmail = action.payload;
    },
    setLoggedInUserPhotoUrl: (state, action) => {
      state.photoUrl = action.payload;
    },
    setUserInitials: (state, action) => {
      state.userInitials = action.payload
      state.photoUrl = ''
    },
    setIsPhoneValidation: (state, action) => {
      state.isPhoneValidationDone = action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload
    },
    setSelectedSpace: (state, action) => {
      console.log('payload ' + action.payload)
      state.selectedSpace = action.payload
    },
    setLoggedInUserGuid: (state, action) => {
      state.loggedInUserGuid = action.payload
    },

  },

});

export const { setDefaultCommunities,
  reset,
  addCommunity,
  joinCommunity,
  setLoggedInUser,
  setLoggedInUserPhotoUrl,
  setUserInitials,
  setIsPhoneValidation,
  setToken,
  setLoggedInUserEmail,
  setSelectedSpace,
  setLoggedInUserGuid } = communitiesSlice.actions;

export default communitiesSlice.reducer;
