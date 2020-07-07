import React from 'react';
import { shallow } from 'enzyme';
import { render } from "../../../utils-test/customRender";

import Header from '../Header';
import SortingSelector from '../../SortingSelector/SortingSelector';
import Logo from '../../../assets/images/logo.svg';

describe('test Header component', () => {
  test('should render component correctly', () => {
    const wrapper = shallow(<Header/>);
    expect(wrapper.find('header')).toHaveLength(1);
    expect(wrapper.find('header').find('a')).toHaveLength(1);
    expect(wrapper.find('header').find('a').find('img')).toHaveLength(1);
    expect(wrapper.find('header').find('a').find('img').prop('src')).toEqual(Logo);
    expect(wrapper.find('header').find('h1')).toHaveLength(1);
    expect(wrapper.find('header').find(SortingSelector)).toHaveLength(1);
  });

  test('should render the title', () => {
    const { container, findByText } = render(<Header title={"Here is the title"}/>);
    expect(findByText(container, 'Here is the title')).toBeTruthy();
  });
});
