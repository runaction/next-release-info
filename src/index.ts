import { getInput, setFailed, setOutput } from '@actions/core';
import moment from 'moment';
import { fetchLatestReleaseTag } from './services/githubService';
import { getNewReleaseTag } from './services/releaseService';

const generateNextReleaseTag = async (): Promise<void> => {
  try {
    const tagPrefix = getInput('tag_prefix');
    const tagFormat = getInput('tag_format');
    const oldReleaseTag = await fetchLatestReleaseTag();
    const newReleaseTag = getNewReleaseTag(tagPrefix, tagFormat, oldReleaseTag);

    console.log(`Previous Release Tag: ${oldReleaseTag}`);
    console.log(`New Release Tag: ${newReleaseTag}`);

    setOutput('release_tag', newReleaseTag);
    setOutput('release_date', moment().format('YYYY-MM-DD'));
  } catch (error) {
    if (error instanceof Error) setFailed(error.message);
  }
};

generateNextReleaseTag();
