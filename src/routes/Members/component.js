import React from 'react';
import { hot } from 'react-hot-loader/root';

import PageLayout from 'layouts/Page';
import SwitchList from 'components/molecules/SwitchList';

import { useMember } from 'models/member';

const PageContent = () => {
	const [{ members }, { getMembers, cleanMembers }] = useMember();

	return (
		<SwitchList
			onOpen={getMembers}
			onClose={cleanMembers}
			items={Object.keys(members).map(key => ({ key, value: members[key].name }))}
		/>
	);
};

const Members = PageLayout({
	PageHeader: "Member's page",
	PageContent,
});

Members.displayName = 'Members';

export default hot(Members);
