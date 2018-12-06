import React from 'react';
import { TopAppBarNavigationIcon } from '@rmwc/top-app-bar';
import { Icon } from '@rmwc/icon';
import { Mutation } from 'react-apollo';
import { Transition } from 'react-spring';
import { Subscribe } from 'unstated';

import { local } from '../../graphs';
import { SidebarContainer } from '../../state';

const AnimatedIcon = ({ open }) => {
  return (
    <Transition
      items={open}
      from={{
        position: 'absolute',
        opacity: 0,
        transform: `rotate(${open ? '-' : ''}180deg)`,
      }}
      enter={{ opacity: 1, transform: 'rotate(0deg)' }}
      leave={{ opacity: 0, transform: `rotate(${open ? '' : '-'}180deg)` }}>
      {isOpen =>
        isOpen
          ? props => (
              <Icon
                icon="keyboard_arrow_left"
                style={{ ...props, fontSize: 32 }}
              />
            )
          : props => <Icon icon="menu" style={props} />
      }
    </Transition>
  );
};

const NavigationIcon = () => {
  return (
    <Subscribe to={[SidebarContainer]}>
      {({ state: sidebar }) => (
        <Mutation mutation={local.mutation.toggleSidebar} ignoreResults>
          {toggleSidebar => (
            <TopAppBarNavigationIcon
              icon={<AnimatedIcon open={sidebar.open} />}
              onClick={toggleSidebar}
            />
          )}
        </Mutation>
      )}
    </Subscribe>
  );
};

export default NavigationIcon;
