import React, {Component, Suspense, lazy, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ScrollToTop from './component/ScrollToTop';
import storage from './common/storage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userInfo from './redux/modules/uphone';


// const Join = lazy(() => import("./pages/Join/Join"));

const Join = lazy(() =>
	import('./pages/Join/Join')
		.then(({ Join }) => ({ default: Join })),
);



const App = (props : any) => {
	useEffect(() => {
		//life cycle 에서 componentDidMount 와 동일하게 구현 = useEffect에 두번째 매개변수에 빈 배열을 놓으면 됩니다.
		//아래 async 안의 코드를 componentDidMount 밖에 꺼내면 오류 납니다.
		(async () => {
			const storageUserInfo = storage.get('userInfo');
			if(!storageUserInfo) return;
			const storageLoginStatus = storage.get('loginStatus');
			if(!storageLoginStatus) return;
			const { uphoneRedux } = props;
			uphoneRedux.setLoggedInfo( storageUserInfo );
			uphoneRedux.setLoginStatus( storageLoginStatus );
		})()
	}, []);

	return (
			<Suspense fallback={<div> </div>}>
				<ScrollToTop>
					<Switch>
						<Route path="/join/:page/:type" component={Join}/>
						<Route path="/join" component={Join}/>
					</Switch>
				</ScrollToTop>
			</Suspense>
	);
};
// export default App;
export default connect(
	null,
	(dispatch) => ({
		uphoneRedux: bindActionCreators(userInfo, dispatch)
	})
)(App);