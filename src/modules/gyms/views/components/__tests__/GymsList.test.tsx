import GymsList from '../GymsList';
import * as TypeMocks from '../../../../../__mocks__/typeMocks';
import React from 'react';
import { shallow } from '../../../../../__mocks__/setupEnzyme';
import { Gym } from '../../../../../types';
import { shallowToJson } from 'enzyme-to-json';
import GymCard from '../GymCard';

const gymArray: Gym[] = [TypeMocks.testGymOne, TypeMocks.testGymTwo];

describe('<GymsList />', (): void => {
  it('should render correctly', (): void => {
    const gymsPage = shallow(
      <GymsList
        cardClass={''}
        gyms={gymArray}
        mobile={false}
        onClick={jest.fn()}
      />
    );
    expect(shallowToJson(gymsPage)).toMatchSnapshot();
  });

  it('should trigger events correctly.', () => {
    const onClick = jest.fn();
    const gymsPage = shallow(
      <GymsList
        cardClass={''}
        gyms={gymArray}
        mobile={false}
        onClick={onClick}
      />
    );

    gymsPage
      .find(GymCard)
      .first()
      .simulate('click');

    expect(onClick).toBeCalledWith(gymArray[0].id);
    expect(onClick).not.toBeCalledWith(gymArray[1].id);

    gymsPage
      .find(GymCard)
      .last()
      .simulate('click');

    expect(onClick).toBeCalledWith(gymArray[1].id);
  });
});
