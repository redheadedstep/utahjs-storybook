import _ from "lodash";
import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import { Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faUser, faStar, faCircle, faTrophy, faMapMarker, faDollarSign, faSortAmountDown } from "@fortawesome/pro-solid-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

import "./SearchTile.scss";

const formatNumber = function (num) {
  return num;
};

const FeeDisplay = function (min, max) {
  if (min === 0 && max === 0) {
    return "Free";
  } else if (min === 0 && max > 0) {
    return "up to " + formatNumber(max);
  } else if (min < 1000 || max < 1000) {
    if (max < 1000) {
      return formatNumber(min) + " - " + formatNumber(max);
    }
    return min + " - " + _.round(max / 1000, 0) + "K";
  } else {
    // let min_precision = 0;
    let max_precision = 0;
    // if (min % 1000 > 0) {
    //     min_precision = 1;
    // }
    if (max % 1000 > 0) {
      max_precision = 1;
    }
    return _.round((min / 1000), max_precision) + "K+";
  }
};

/**
 * Search Tile used in search results
 */
export const SearchTile = ({ speaker, is_featured, is_showcased, ...props }) => {

  // static getDerivedStateFromProps = (props) => ({
  //   is_shortlisted: is_shortlisted,
  //   awards: _.get(props.sitelists, ["global", "flags", "awards"]),
  //   speaker: speaker,
  //   videos: _.filter(_.get(speaker, ["profile", "assets"]), (a) => (_.includes(['VIDEO'], _.get(a, ["category"]))))
  // })

  const [is_shortlisted, setShortlisted] = useState(false);
  useEffect(() => {
    if (_.isFunction(props.onFavorite)) {
      props.onFavorite(speaker, is_shortlisted)
    }
  }, [is_shortlisted]);

  const __onWatchVideo = () => {
    if (_.isFunction(props.onWatchVideo)) {
      return props.onWatchVideo(speaker);
    }
  };

  const __onViewSchedule = () => {
    if (_.isFunction(props.onViewSchedule)) {
      return props.onViewSchedule(speaker);
    }
  };

  const __onViewPrograms = () => {
    if (_.isFunction(props.onViewPrograms)) {
      return props.onViewPrograms(speaker);
    }
  };

  const __onProfile = () => {
    if (_.isFunction(props.onProfile)) {
      return props.onProfile(speaker);
    }
  };

  const __onReview = () => {
    if (_.isFunction(props.onReview)) {
      return props.onReview(speaker);
    }
  };

  const __onViewRatings = () => {
    if (_.isFunction(props.onViewRatings)) {
      return props.onViewRatings(speaker);
    }
  };

  const __onMenu = (e) => {
    // Since the image is clickable to the profile, we stopPropagation when the menu opens
    // otherwise the menu would open AND we would redirect to the profile
    e.stopPropagation();
  };

  const __onFavorite = () => {
    if (_.isFunction(props.onFavorite)) {
      setShortlisted(!is_shortlisted);
    }
  };

  const __onFeature = () => {
    if (_.isFunction(props.onFeature)) {
      props.onFeature(speaker);
    }
  }

  const videos = _.filter(_.get(speaker, ["profile", "assets"]), (a) => (_.includes(['VIDEO'], _.get(a, ["category"]))));
  const rating = _.meanBy(_.get(speaker, ["profile", "marketplace", "ratings"]), "rating");
  const speaker_awards = [];
  const bio_oneline = _.get(_.find(_.get(speaker, ["profile", "bios"]), (b) => (_.get(b, ['language']) === "en" && _.isEmpty(_.get(b, ["tags"], [])))), "oneline");
  const assets_cols = (12 / (((_.size(_.get(speaker, ["profile", "recommendations"], [])) > 0) ? 1 : 0) + ((_.size(videos) > 0) ? 1 : 0) + 1));
  const fee_display = FeeDisplay(_.get(speaker, ["profile", "marketplace", "fee_low"]), _.get(speaker, ["profile", "marketplace", "fee_high"]));
  const speaker_thumb_style = {
    backgroundImage: _.isUndefined(_.get(speaker, ["profile", "thumbnail", "url"])) ? 'url(./img/media/photo_placeholder.jpg)' :  "url(\"" + _.get(speaker, ["profile", "thumbnail", "url"]) + "\")",
    backgroundPosition: "middle center"
  }

  return (
    <div className="speaker-tile" id={"sid" + _.get(speaker, ["profile", "id"])}>
      <div className="speaker-thumb" style={speaker_thumb_style}>
        <Row>
          <Col xs={8} className="text-left">
            {_.get(speaker, ["available_on"]) && (
              <div className="speaker-availability">
                {_.get(speaker, ["available_status"], 0) === 0 && (
                  <span>
                    <FontAwesomeIcon icon={faCircle} className="mp-tertiary" /> {"Call for availability"}
                  </span>
                )}
                {_.get(speaker, ["available_status"], 0) === 1 && (
                  <span>
                    <FontAwesomeIcon icon={faCircle} className="text-danger" /> {"Not available"} {_.get(speaker, ["available_on"], "")}
                  </span>
                )}
                {_.get(speaker, ["available_status"], 0) === 2 && (
                  <span>
                    <FontAwesomeIcon icon={faCircle} className="mp-primary" /> {"Available"} {_.get(speaker, ["available_on"], "")}
                  </span>
                )}
              </div>
            )}
            {_.get(speaker, ["distance"]) > -1 && _.get(speaker, ["distance"]) < 500 && (
              <div className="speaker-distance">
                {_.get(speaker, ["distance"], 0)} {"miles away"}
              </div>
            )}
          </Col>
          <Col xs={4} className="text-right speaker-top-actions">
            {_.isFunction(__onFavorite) && <FontAwesomeIcon icon={faHeart} fixedWidth className={is_shortlisted ? "text-info small" : ""} onClick={__onFavorite} />}
          </Col>
        </Row>
      </div>
      {is_featured && !is_showcased && <div className="speaker-featured">{"Featured"}</div>}
      {is_showcased && <div className="speaker-showcased">{"Showcased"}</div>}
      <div className={"speaker-details " + (is_featured ? "featured " : "") + (is_showcased ? "showcased " : "")}>
        <div className="speaker-name">{_.get(speaker, ["profile", "speaker_name"])}</div>
        {!_.isNaN(rating) && (
          <div>
            {_.map([1, 2, 3, 4, 5], (i) => (<FontAwesomeIcon key={i} icon={faStar} className={rating < i ? "-o" : ""} />))}{" "}
            <div className="small" onClick={__onViewRatings}>
              {"view ratings"}
            </div>
          </div>
        )}
        <Row className={"mt-3"}>
          <Col sm={6} className="speaker-location">
            <FontAwesomeIcon icon={faMapMarker} className="mp-tertiary-background"/>{" "}
            {!_.isNull(_.get(speaker, ["profile", "marketplace", "travels_from_state"]))
              ? _.get(speaker, ["profile", "marketplace", "travels_from_state"])
              : _.get(speaker, ["profile", "state"])
            }
            {!_.isNull(!_.isNull(_.get(speaker, ["profile", "marketplace", "travels_from_state"])) ? _.get(speaker, ["profile", "marketplace", "travels_from_state"]) : _.get(speaker, ["profile", "state"])) && <span>{", "}</span>}
            {!_.isNull(_.get(speaker, ["profile", "marketplace", "travels_from_country"]))
              ? _.get(speaker, ["profile", "marketplace", "travels_from_country"])
              : _.get(speaker, ["profile", "country"])
            }
          </Col>
          <Col sm={6} className="speaker-awards">
            {_.size(speaker_awards) > 0 && <FontAwesomeIcon icon={faTrophy} className="mp-tertiary-background"/>}
            {_.map(_.slice(speaker_awards, 0, 2), (item, i) => (<span key={i}>{" "}{item}</span>))}
          </Col>
        </Row>
        <div className="speaker-oneline text-left">
          <p dangerouslySetInnerHTML={{__html: bio_oneline}} />
          <p>{_.get(speaker, ["bio_match_text"])}</p>
        </div>
        <div className="speaker-assets">
          <Row>
            {_.size(_.get(speaker, ["profile", "recommendations"], [])) > 0 && (
              <Col xs={assets_cols}>
                <div className="speaker-asset">
                  <FontAwesomeIcon icon={faStar} className="mp-tertiary-background text-center" /> <span className="asset-value">{_.size(_.get(speaker, ["profile", "recommendations"], []))}</span>
                  <div className="asset-name">{"Reviews"}</div>
                </div>
              </Col>
            )}
            {(_.size(videos) > 0) &&
              <Col xs={assets_cols}>
                <div className="speaker-asset">
                  <FontAwesomeIcon icon={faYoutube} className="mp-tertiary-background text-center"/> <span
                  className="asset-value">{_.size(videos)}</span>
                  <div className="asset-name">Videos</div>
                </div>
              </Col>
            }
            <Col xs={assets_cols}>
              {_.get(speaker, ["profile", "marketplace", "fee_low"], 0) === 0 && _.get(speaker, ["profile", "marketplace", "fee_high"], 0) === 0 ? (
                <div className="speaker-asset">
                  <span className="asset-value">Contact for fees</span>
                  <div className="asset-name">Fee (USD)</div>
                </div>
              ) : (
                <div className="speaker-asset">
                  <FontAwesomeIcon icon={faDollarSign} className="mp-tertiary-background text-center" style={{marginRight: "0"}} />
                  <span className="asset-value"> {fee_display}</span>
                  <div className="asset-name">Fee (USD)</div>
                </div>
              )}
            </Col>
          </Row>
        </div>
        {props.is_debug && (
          <div className="speaker-assets">
            <Row>
              <Col xs={6}>
                <div className="speaker-asset">
                  <span className="asset-value">{_.get(speaker, ["profile", "marketplace", "sortscore"], 0)}</span>
                  <div className="asset-name">
                    <FontAwesomeIcon icon={faSortAmountDown} className="mp-tertiary text-center" /> Sort Score
                  </div>
                </div>
              </Col>
              <Col xs={6}>
                <div className="speaker-asset">
                  <span className="asset-value">{_.get(speaker, ["profile", "id"], 0)}</span>
                  <div className="asset-name">
                    <FontAwesomeIcon icon={faUser} className="mp-tertiary text-center" /> SID
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        )}
        <div className="speaker-actions">
          <Row>
            <Col xs={6} className={"text-center"}>
              <Button variant={"primary"} className="mp-primary" onClick={__onProfile}>
                <span className="d-none d-md-block">{"View Profile"}</span>
                <span className="d-md-none">{"Profile"}</span>
              </Button>
            </Col>
            <Col xs={6} className={"text-center"}>
              {is_shortlisted ? (
                <Button variant={"info"} onClick={__onFavorite}>
                  <span className="d-none d-md-block"><FontAwesomeIcon icon={faHeart} />{" "}{"Favorite"}</span>
                  <span className="d-md-none">{"Favorite"}</span>
                </Button>
              ) : (
                <Button variant={"secondary"} onClick={__onFavorite}>
                  <span className="d-none d-md-block"><FontAwesomeIcon icon={faHeart} />{" "}{"Favorite"}</span>
                  <span className="d-md-none">{"Favorite"}</span>
                </Button>
              )}
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

SearchTile.propTypes = {
  /**
   * site lists containing default settings for the site
   */
  sitelists: PropTypes.object,
  /**
   * Speaker object returned by the api
   */
  speaker: PropTypes.object,
  /**
   * Whether the speaker is featured on the site or not
   */
  is_featured: PropTypes.bool,
  /**
   * Whether the speaker is showcased on the site or not
   */
  is_showcased: PropTypes.bool,
  /**
   * Whether to show debug settings on the tile
   */
  is_debug: PropTypes.bool,
  /**
   * Function to set the shortlisted status
   */
  onFavorite: PropTypes.func,
  /**
   * Function to feature a profile on a directory (used on the backend)
   */
  onFeature: PropTypes.func,
  /**
   * Function called before going to the profile page (used to track page hits)
   */
  onProfile: PropTypes.func,
  /**
   * Function called to watch a video (used on flip side when videos are listed)
   */
  onWatchVideo: PropTypes.func,
  /**
   * Function called to view the schedule (show a popup calendar)
   */
  onViewSchedule: PropTypes.func,
  /**
   * Function called to view the programs (show a popup)
   */
  onViewPrograms: PropTypes.func,
  /**
   * Function called to view the past reviews (show a popup)
   */
  onViewRatings: PropTypes.func,
  /**
   * Function called to add a review to the speaker (used on the backend)
   */
  onReview: PropTypes.func
};
