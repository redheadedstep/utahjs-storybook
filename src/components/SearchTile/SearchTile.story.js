import _ from "lodash";
import React from 'react';
import SearchTile from "components/SearchTile";
import speakerMock from "__mocks__/speaker";


export default {
  title: 'Components/SearchTile',
  component: SearchTile,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // is_showcased: { control: 'text' }
  },
  args: {
    //👇 Now all search tiles
    speaker: {profile: _.get(speakerMock, ["record"])}
  },
};

const Template = (args) => <SearchTile {...args} />;

export const Default = Template.bind({
  speaker: {profile: _.get(speakerMock, ["record"])}
});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  speaker: {profile: _.get(speakerMock, ["record"])},
};

export const Featured = Template.bind({});
Featured.args = {
  speaker: {profile: _.get(speakerMock, ["record"])},
  is_featured: true
}

export const Showcased = Template.bind({});
Showcased.args = {
  speaker: {profile: _.get(speakerMock, ["record"])},
  is_showcased: true
}

export const Admin = Template.bind({});
Admin.args = {
  speaker: {profile: _.get(speakerMock, ["record"])},
  is_debug: true
}



//
//
// import _ from "lodash";
// import React from "react";
// import {action} from "@storybook/addon-actions";
// import {storiesOf} from "@storybook/react";
// import {withKnobs} from "@storybook/addon-knobs";
// import {withConsole} from "@storybook/addon-console";
// import {withSmartKnobs} from "storybook-addon-smart-knobs";
// import {withDocs} from "storybook-readme";
// import {IndexDecorator} from "../../__stories__/Decorator";
// import withTests from "../../__stories__/withTests";
// // Import the README
// import README from "./README.md";
// // Import the actual component
// import SpeakerTile from "./SpeakerTile";
// // Import the redux provider and mock store
// import {Provider} from "react-redux";
// import createTestStore from "../../__mocks__/createTestStore";
// import speakerMock from "../../__mocks__/speakerMock";
// import storeMock from "../../__mocks__/storeMock";
//
// const store = createTestStore();
//
// storiesOf("Components/SpeakerTile", module)
//     .addDecorator(withSmartKnobs)
//     .addDecorator(withKnobs)
//     .addDecorator(withDocs(README))
//     .addDecorator(withTests("SpeakerTile"))
//     .addDecorator((storyFn, context) => withConsole()(storyFn)(context))
//     .addDecorator(IndexDecorator)
//     .addDecorator((storyFn) => (<div style={{display:"block"}}>{storyFn()}</div>))
//     .addDecorator(story => <Provider store={store}>{story()}</Provider>)
//     .add("Default", () => <div>
//         <div className="row">
//             <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 text-left">
//                 <SpeakerTile
//                     speaker={speakerMock}
//                     mpsitelists={_.get(storeMock, ["Whitelabel", "sitelists"])}
//                     onFavorite={action("onFavorite")}
//                     onProfile={action("onProfile")}
//                     onWatchVideo={action("onWatchVideo")}
//                     onViewSchedule={action("onViewSchedule")}
//                     onViewPrograms={action("onViewPrograms")}
//                 />
//             </div>
//         </div>
//     </div>)
//     .add("Shortlisted", () => <div>
//         <div className="row">
//             <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 text-left">
//                 <SpeakerTile
//                     speaker={speakerMock}
//                     mpsitelists={_.get(storeMock, ["Whitelabel", "sitelists"])}
//                     is_shortlisted={true}
//                     onFavorite={action("onFavorite")}
//                     onProfile={action("onProfile")}
//                     onWatchVideo={action("onWatchVideo")}
//                     onViewSchedule={action("onViewSchedule")}
//                     onViewPrograms={action("onViewPrograms")}
//                 />
//             </div>
//         </div>
//     </div>)
//     .add("Availablity", () => <div>
//         <div className="row">
//             <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 text-left">
//                 <SpeakerTile
//                     speaker={_.assign({}, speakerMock, {available_status: 2, available_on: "April 2nd, 2018"})}
//                     mpsitelists={_.get(storeMock, ["Whitelabel", "sitelists"])}
//                     onFavorite={action("onFavorite")}
//                     onProfile={action("onProfile")}
//                     onWatchVideo={action("onWatchVideo")}
//                     onViewSchedule={action("onViewSchedule")}
//                     onViewPrograms={action("onViewPrograms")}
//                 />
//             </div>
//         </div>
//     </div>)
//     .add("Distance", () => <div>
//         <div className="row">
//             <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 text-left">
//                 <SpeakerTile
//                     speaker={_.assign({}, speakerMock, {distance: 32})}
//                     mpsitelists={_.get(storeMock, ["Whitelabel", "sitelists"])}
//                     onFavorite={action("onFavorite")}
//                     onProfile={action("onProfile")}
//                     onWatchVideo={action("onWatchVideo")}
//                     onViewSchedule={action("onViewSchedule")}
//                     onViewPrograms={action("onViewPrograms")}
//                 />
//             </div>
//         </div>
//     </div>)
//     .add("Availability & Distance", () => <div>
//         <div className="row">
//             <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 text-left">
//                 <SpeakerTile
//                     speaker={_.assign({}, speakerMock, {available_status: 2, available_on: "April 2nd, 2018", distance: 32})}
//                     mpsitelists={_.get(storeMock, ["Whitelabel", "sitelists"])}
//                     onFavorite={action("onFavorite")}
//                     onProfile={action("onProfile")}
//                     onWatchVideo={action("onWatchVideo")}
//                     onViewSchedule={action("onViewSchedule")}
//                     onViewPrograms={action("onViewPrograms")}
//                 />
//             </div>
//         </div>
//     </div>)
//     .add("Multiple", () =>
//         <div>
//             <div className="row text-left">
//                 <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
//                     <SpeakerTile speaker={speakerMock} mpsitelists={_.get(storeMock, ["Whitelabel", "sitelists"])} />
//                 </div>
//                 <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
//                     <SpeakerTile speaker={speakerMock} mpsitelists={_.get(storeMock, ["Whitelabel", "sitelists"])} is_featured={true} />
//                 </div>
//                 <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
//                     <SpeakerTile speaker={speakerMock} mpsitelists={_.get(storeMock, ["Whitelabel", "sitelists"])} is_shortlisted={true} />
//                 </div>
//                 <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
//                     <SpeakerTile speaker={speakerMock} mpsitelists={_.get(storeMock, ["Whitelabel", "sitelists"])} is_featured={true} is_shortlisted={true} />
//                 </div>
//                 <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
//                     <SpeakerTile speaker={speakerMock} mpsitelists={_.get(storeMock, ["Whitelabel", "sitelists"])} />
//                 </div>
//                 <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
//                     <SpeakerTile speaker={speakerMock} mpsitelists={_.get(storeMock, ["Whitelabel", "sitelists"])} />
//                 </div>
//                 <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
//                     <SpeakerTile speaker={speakerMock} mpsitelists={_.get(storeMock, ["Whitelabel", "sitelists"])} />
//                 </div>
//                 <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
//                     <SpeakerTile speaker={speakerMock} mpsitelists={_.get(storeMock, ["Whitelabel", "sitelists"])} />
//                 </div>
//                 <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
//                     <SpeakerTile speaker={speakerMock} mpsitelists={_.get(storeMock, ["Whitelabel", "sitelists"])} />
//                 </div>
//             </div>
//         </div>);