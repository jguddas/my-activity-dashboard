/* tslint:disable */
/* eslint-disable */

export namespace Athletes {
  /**
   * @description Returns the activity stats of an athlete. Only includes data from activities set to Everyone visibilty.
   * @tags Athletes
   * @name GetStats
   * @summary Get Athlete Stats
   * @request GET:/athletes/{id}/stats
   * @secure
   */
  export namespace GetStats {
    export type RequestParams = { id: string }
    export type RequestQuery = {}
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = any
  }
  /**
   * @description Returns a list of the routes created by the authenticated athlete. Private routes are filtered out unless requested by a token with read_all scope.
   * @tags Routes
   * @name GetRoutesByAthleteId
   * @summary List Athlete Routes
   * @request GET:/athletes/{id}/routes
   * @secure
   */
  export namespace GetRoutesByAthleteId {
    export type RequestParams = { id: string }
    export type RequestQuery = { page?: number; perPage?: number }
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = any[]
  }
}

export namespace Athlete {
  /**
   * @description Returns the currently authenticated athlete. Tokens with profile:read_all scope will receive a detailed athlete representation; all others will receive a summary representation.
   * @tags Athletes
   * @name GetLoggedInAthlete
   * @summary Get Authenticated Athlete
   * @request GET:/athlete
   * @secure
   */
  export namespace GetLoggedInAthlete {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = any
  }
  /**
   * @description Update the currently authenticated athlete. Requires profile:write scope.
   * @tags Athletes
   * @name UpdateLoggedInAthlete
   * @summary Update Athlete
   * @request PUT:/athlete
   * @secure
   */
  export namespace UpdateLoggedInAthlete {
    export type RequestParams = { weight: number }
    export type RequestQuery = {}
    export type RequestBody = any
    export type RequestHeaders = {}
    export type ResponseBody = any
  }
  /**
   * @description Returns the the authenticated athlete's heart rate and power zones. Requires profile:read_all.
   * @tags Athletes
   * @name GetLoggedInAthleteZones
   * @summary Get Zones
   * @request GET:/athlete/zones
   * @secure
   */
  export namespace GetLoggedInAthleteZones {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = any
  }
  /**
   * @description Returns the activities of an athlete for a specific identifier. Requires activity:read. Only Me activities will be filtered out unless requested by a token with activity:read_all.
   * @tags Activities
   * @name GetLoggedInAthleteActivities
   * @summary List Athlete Activities
   * @request GET:/athlete/activities
   * @secure
   */
  export namespace GetLoggedInAthleteActivities {
    export type RequestParams = {}
    export type RequestQuery = { before?: number; after?: number; page?: number; perPage?: number }
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = any[]
  }
  /**
   * @description Returns a list of the clubs whose membership includes the authenticated athlete.
   * @tags Clubs
   * @name GetLoggedInAthleteClubs
   * @summary List Athlete Clubs
   * @request GET:/athlete/clubs
   * @secure
   */
  export namespace GetLoggedInAthleteClubs {
    export type RequestParams = {}
    export type RequestQuery = { page?: number; perPage?: number }
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = any[]
  }
}

export interface StaredSegment {
    id:                 number;
    resource_state:     number;
    name:               string;
    activity_type:      string;
    distance:           number;
    average_grade:      number;
    maximum_grade:      number;
    elevation_high:     number;
    elevation_low:      number;
    start_latlng:       [number,number];
    end_latlng:         [number,number];
    elevation_profile:  null;
    start_latitude:     number;
    start_longitude:    number;
    end_latitude:       number;
    end_longitude:      number;
    climb_category:     number;
    city:               null | string;
    state:              string | null;
    country:            string | null;
    private:            boolean;
    hazardous:          boolean;
    starred:            boolean;
    pr_time?:           number;
    athlete_pr_effort?: AthletePREffort;
    starred_date:       Date;
}

export interface AthletePREffort {
    id:               number;
    activity_id:      number;
    elapsed_time:     number;
    distance:         number;
    start_date:       Date;
    start_date_local: Date;
    is_kom:           boolean;
}

export namespace Segments {
  /**
   * @description Returns the specified segment. read_all scope required in order to retrieve athlete-specific segment information, or to retrieve private segments.
   * @tags Segments
   * @name GetSegmentById
   * @summary Get Segment
   * @request GET:/segments/{id}
   * @secure
   */
  export namespace GetSegmentById {
    export type RequestParams = { id: string }
    export type RequestQuery = {}
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = any
  }
  /**
   * @description List of the authenticated athlete's starred segments. Private segments are filtered out unless requested by a token with read_all scope.
   * @tags Segments
   * @name GetLoggedInAthleteStarredSegments
   * @summary List Starred Segments
   * @request GET:/segments/starred
   * @secure
   */
  export namespace GetLoggedInAthleteStarredSegments {
    export type RequestParams = {}
    export type RequestQuery = { page?: number; perPage?: number }
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = StaredSegment[]
  }
  /**
   * @description Stars/Unstars the given segment for the authenticated athlete. Requires profile:write scope.
   * @tags Segments
   * @name StarSegment
   * @summary Star Segment
   * @request PUT:/segments/{id}/starred
   * @secure
   */
  export namespace StarSegment {
    export type RequestParams = { id: string }
    export type RequestQuery = {}
    export type RequestBody = { starred: boolean }
    export type RequestHeaders = {}
    export type ResponseBody = any
  }
  /**
   * @description Returns the top 10 segments matching a specified query.
   * @tags Segments
   * @name ExploreSegments
   * @summary Explore segments
   * @request GET:/segments/explore
   * @secure
   */
  export namespace ExploreSegments {
    export type RequestParams = {}
    export type RequestQuery = {
      bounds: number[];
      activityType?: 'running' | 'riding';
      minCat?: number;
      maxCat?: number;
    }
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = any
  }
  /**
   * @description Returns the given segment's streams. Requires read_all scope for private segments.
   * @tags Streams
   * @name GetSegmentStreams
   * @summary Get Segment Streams
   * @request GET:/segments/{id}/streams
   * @secure
   */
  export namespace GetSegmentStreams {
    export type RequestParams = { id: string }
    export type RequestQuery = { keys: ('distance' | 'latlng' | 'altitude')[]; keyByType: boolean }
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = any
  }
}

export namespace SegmentEfforts {
  /**
   * @description Returns a set of the authenticated athlete's segment efforts for a given segment.  Requires subscription.
   * @tags SegmentEfforts
   * @name GetEffortsBySegmentId
   * @summary List Segment Efforts
   * @request GET:/segment_efforts
   * @secure
   */
  export namespace GetEffortsBySegmentId {
    export type RequestParams = {}
    export type RequestQuery = {
      segmentId: number;
      startDateLocal?: string;
      endDateLocal?: string;
      perPage?: number;
    }
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = any[]
  }
  /**
   * @description Returns a segment effort from an activity that is owned by the authenticated athlete. Requires subscription.
   * @tags SegmentEfforts
   * @name GetSegmentEffortById
   * @summary Get Segment Effort
   * @request GET:/segment_efforts/{id}
   * @secure
   */
  export namespace GetSegmentEffortById {
    export type RequestParams = { id: string }
    export type RequestQuery = {}
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = any
  }
  /**
   * @description Returns a set of streams for a segment effort completed by the authenticated athlete. Requires read_all scope.
   * @tags Streams
   * @name GetSegmentEffortStreams
   * @summary Get Segment Effort Streams
   * @request GET:/segment_efforts/{id}/streams
   * @secure
   */
  export namespace GetSegmentEffortStreams {
    export type RequestParams = { id: string }
    export type RequestQuery = {
      keys: (
        | 'time'
        | 'distance'
        | 'latlng'
        | 'altitude'
        | 'velocitySmooth'
        | 'heartrate'
        | 'cadence'
        | 'watts'
        | 'temp'
        | 'moving'
        | 'gradeSmooth'
      )[];
      keyByType: boolean;
    }
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = any
  }
}

export namespace RunningRaces {
  /**
   * @description Returns a running race for a given identifier.
   * @tags RunningRaces
   * @name GetRunningRaceById
   * @summary Get Running Race
   * @request GET:/running_races/{id}
   * @secure
   */
  export namespace GetRunningRaceById {
    export type RequestParams = { id: string }
    export type RequestQuery = {}
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = any
  }
  /**
   * @description Returns a list running races based on a set of search criteria.
   * @tags RunningRaces
   * @name GetRunningRaces
   * @summary List Running Races
   * @request GET:/running_races
   * @secure
   */
  export namespace GetRunningRaces {
    export type RequestParams = {}
    export type RequestQuery = { year?: number }
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = any[]
  }
}

export namespace Activities {
  /**
   * @description Creates a manual activity for an athlete, requires activity:write scope.
   * @tags Activities
   * @name CreateActivity
   * @summary Create an Activity
   * @request POST:/rctivities
   * @secure
   */
  export namespace CreateActivity {
    export type RequestParams = {}
    export type RequestQuery = {}
    export type RequestBody = {
      name: string;
      type: string;
      startDateLocal: string;
      elapsedTime: number;
      description?: string;
      distance?: number;
      trainer?: number;
      commute?: number;
    }
    export type RequestHeaders = {}
    export type ResponseBody = any
  }
  /**
   * @description Returns the given activity that is owned by the authenticated athlete. Requires activity:read for Everyone and Followers activities. Requires activity:read_all for Only Me activities.
   * @tags Activities
   * @name GetActivityById
   * @summary Get Activity
   * @request GET:/activities/{id}
   * @secure
   */
  export namespace GetActivityById {
    export type RequestParams = { id: string }
    export type RequestQuery = { includeAllEfforts?: boolean }
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = any
  }
  /**
   * @description Updates the given activity that is owned by the authenticated athlete. Requires activity:write. Also requires activity:read_all in order to update Only Me activities
   * @tags Activities
   * @name UpdateActivityById
   * @summary Update Activity
   * @request PUT:/activities/{id}
   * @secure
   */
  export namespace UpdateActivityById {
    export type RequestParams = { id: string }
    export type RequestQuery = {}
    export type RequestBody = any
    export type RequestHeaders = {}
    export type ResponseBody = any
  }
  /**
   * @description Returns the laps of an activity identified by an identifier. Requires activity:read for Everyone and Followers activities. Requires activity:read_all for Only Me activities.
   * @tags Activities
   * @name GetLapsByActivityId
   * @summary List Activity Laps
   * @request GET:/activities/{id}/laps
   * @secure
   */
  export namespace GetLapsByActivityId {
    export type RequestParams = { id: string }
    export type RequestQuery = {}
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = any[]
  }
  /**
   * @description Summit Feature. Returns the zones of a given activity. Requires activity:read for Everyone and Followers activities. Requires activity:read_all for Only Me activities.
   * @tags Activities
   * @name GetZonesByActivityId
   * @summary Get Activity Zones
   * @request GET:/activities/{id}/zones
   * @secure
   */
  export namespace GetZonesByActivityId {
    export type RequestParams = { id: string }
    export type RequestQuery = {}
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = any[]
  }
  /**
   * @description Returns the comments on the given activity. Requires activity:read for Everyone and Followers activities. Requires activity:read_all for Only Me activities.
   * @tags Activities
   * @name GetCommentsByActivityId
   * @summary List Activity Comments
   * @request GET:/activities/{id}/comments
   * @secure
   */
  export namespace GetCommentsByActivityId {
    export type RequestParams = { id: string }
    export type RequestQuery = { page?: number; perPage?: number }
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = any[]
  }
  /**
   * @description Returns the athletes who kudoed an activity identified by an identifier. Requires activity:read for Everyone and Followers activities. Requires activity:read_all for Only Me activities.
   * @tags Activities
   * @name GetKudoersByActivityId
   * @summary List Activity Kudoers
   * @request GET:/activities/{id}/kudos
   * @secure
   */
  export namespace GetKudoersByActivityId {
    export type RequestParams = { id: string }
    export type RequestQuery = { page?: number; perPage?: number }
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = any[]
  }
  /**
   * @description Returns the given activity's streams. Requires activity:read scope. Requires activity:read_all scope for Only Me activities.
   * @tags Streams
   * @name GetActivityStreams
   * @summary Get Activity Streams
   * @request GET:/activities/{id}/streams
   * @secure
   */
  export namespace GetActivityStreams {
    export type RequestParams = { id: string }
    export type RequestQuery = {
      keys: (
        | 'time'
        | 'distance'
        | 'latlng'
        | 'altitude'
        | 'velocitySmooth'
        | 'heartrate'
        | 'cadence'
        | 'watts'
        | 'temp'
        | 'moving'
        | 'gradeSmooth'
      )[];
      keyByType: boolean;
    }
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = any
  }
}

export namespace Clubs {
  /**
   * @description Returns a given club using its identifier.
   * @tags Clubs
   * @name GetClubById
   * @summary Get Club
   * @request GET:/clubs/{id}
   * @secure
   */
  export namespace GetClubById {
    export type RequestParams = { id: string }
    export type RequestQuery = {}
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = any
  }
  /**
   * @description Returns a list of the athletes who are members of a given club.
   * @tags Clubs
   * @name GetClubMembersById
   * @summary List Club Members
   * @request GET:/clubs/{id}/members
   * @secure
   */
  export namespace GetClubMembersById {
    export type RequestParams = { id: string }
    export type RequestQuery = { page?: number; perPage?: number }
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = any[]
  }
  /**
   * @description Returns a list of the administrators of a given club.
   * @tags Clubs
   * @name GetClubAdminsById
   * @summary List Club Administrators
   * @request GET:/clubs/{id}/admins
   * @secure
   */
  export namespace GetClubAdminsById {
    export type RequestParams = { id: string }
    export type RequestQuery = { page?: number; perPage?: number }
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = any[]
  }
  /**
   * @description Retrieve recent activities from members of a specific club. The authenticated athlete must belong to the requested club in order to hit this endpoint. Pagination is supported. Athlete profile visibility is respected for all activities.
   * @tags Clubs
   * @name GetClubActivitiesById
   * @summary List Club Activities
   * @request GET:/clubs/{id}/activities
   * @secure
   */
  export namespace GetClubActivitiesById {
    export type RequestParams = { id: string }
    export type RequestQuery = { page?: number; perPage?: number }
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = any[]
  }
}

export namespace Gear {
  /**
   * @description Returns an equipment using its identifier.
   * @tags Gears
   * @name GetGearById
   * @summary Get Equipment
   * @request GET:/gear/{id}
   * @secure
   */
  export namespace GetGearById {
    export type RequestParams = { id: string }
    export type RequestQuery = {}
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = any
  }
}

export namespace Auth {
  export namespace Deauthorization {
    export type RequestParams = never
    export type RequestQuery = { accessToken: string }
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = undefined
  }
  export namespace RefreshToken {
    export type RequestParams = never
    export type RequestQuery = {
      clientId: string,
      clientSecret: string,
      grantType: 'refresh_token',
      refreshToken: string,
    }
    export type RequestBody = never
    export type RequestHeaders = {}
    export type ResponseBody = {
      token_type: 'Bearer'
      access_token: string
      expires_at: number
      expires_in: number
      refresh_token: string
    }
  }
  export namespace ExchangeToken {
    export type RequestParams = never
    export type RequestQuery = {
      code: string
      clientId: string
      clientSecret: string
      grantType: 'authorization_code'
    }
    export type RequestBody = never
    export type RequestHeaders = never 
    export type ResponseBody = {
      token_type: string
      expires_at: number
      expires_in: number
      refresh_token: string
      access_token: string
      athlete: {
        id: number
        username: null | string
        resource_state: number
        firstname: string
        lastname: string
        city: string
        state: string
        country: string
        sex: string
        premium: boolean
        summit: boolean
        created_at: string
        updated_at: string
        badge_type_id: number
        profile_medium: string
        profile: string
        friend: null
        follower: null
      }
    }
  }
}
