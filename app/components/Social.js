/* eslint-disable react/prop-types */

import {
  Button,
  Grid,
  GridRow,
  Header,
  Icon,
  TextArea,
  GridColumn,
} from 'semantic-ui-react';
import React from 'react';

export default function SocialComponent(props) {
  const urlShare = `${props.url} | ${props.short}`;
  return (
    <Grid celled="internally" relaxed="very">
      <GridRow>
        <GridColumn width={4}>
          <Header as="h2" icon>
            <Icon name="share alternate" />
            Compartir Url
          </Header>
        </GridColumn>
        <GridColumn width={12}>
          <GridRow>
            <TextArea value={urlShare} />
          </GridRow>
          <GridRow>
            <a href={`https://www.facebook.com/sharer.php?u=${props.url}`}>
              <Button
                icon="facebook f"
                content="Facebook"
                basic
                color="blue"
                component
              />
              <a
                href={`https://twitter.com/share?ref_src=twsrc%5Etfw&url=${
                  props.url
                }`}
                className="twitter-share-button"
                data-show-count="false"
              >
                <Button icon="twitter" content="Twitter" basic color="blue" />
              </a>
              <script
                async
                src="https://platform.twitter.com/widgets.js"
                charset="utf-8"
              />
            </a>
          </GridRow>
        </GridColumn>
      </GridRow>
    </Grid>
  );
}
