import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
    List,
    Chip,
    Icon,
    Tooltip,
    ListItem,
    IconButton,
    ListItemText,
    ListItemIcon,
    ListSubheader,
} from '@material-ui/core';
import { AddCircleOutline, Lock } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    listItem: {
        color: theme.palette.grey[400],
    },
    iconRoot: {
        width: '0.7em',
        margin: 0,
        color: 'inherit',
    },
    chip: {
        height: 20,
    },
    selected: {
        backgroundColor: `${theme.palette.primary.light}!important`,
    },
    subheader: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingRight: theme.spacing.unit,
    },
});

const ChannelsList = ({
    classes, isOwner, teamId, channels, onToggle, channelId,
}) => {
    const channelsList = channels.map(ch => (
        <ListItem
            button
            component={Link}
            key={`channel-${ch.id}`}
            to={`/teams/${teamId}/${ch.id}`}
            className={classes.listItem}
            classes={{ selected: classes.selected }}
            selected={channelId === ch.id}
        >
            <ListItemIcon className={classes.iconRoot}>
                {ch.private ? <Lock /> : <Icon children="#" />}
            </ListItemIcon>
            <ListItemText
                primary={ch.name}
                primaryTypographyProps={{
                    color: 'inherit',
                }}
            />
            {
                ch.updatesCount > 0 && (
                    <Chip
                        label={ch.updatesCount}
                        color="secondary"
                        className={classes.chip}
                    />
                )
            }
        </ListItem>
    ));

    return (
        <List
            subheader={(
                <ListSubheader
                    color="inherit"
                    className={classes.subheader}
                >
                    {`CHANNELS (${channels.length})`}
                    {
                        isOwner && (
                            <Tooltip title="Add new channel">
                                <IconButton
                                    color="inherit"
                                    onClick={() => onToggle('isAddChannelModalOpen')}
                                >
                                    <AddCircleOutline />
                                </IconButton>
                            </Tooltip>
                        )
                    }
                </ListSubheader>
            )}
        >
            {channelsList}
        </List>
    );
};

ChannelsList.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    teamId: PropTypes.number.isRequired,
    isOwner: PropTypes.bool.isRequired,
    channels: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        private: PropTypes.bool.isRequired,
        updatesCount: PropTypes.number.isRequired,
    })).isRequired,
    onToggle: PropTypes.func.isRequired,
    channelId: PropTypes.number.isRequired,
};

export default withStyles(styles)(ChannelsList);
