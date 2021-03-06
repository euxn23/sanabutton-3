import {
  AudioInfo,
  AudioInfoText,
  AudioTitle,
  Container,
  ControlButton,
  ControlButtons,
  ShareContainer,
  SourceTitle,
  ButtonsContainer,
} from './styles';
import React, { ReactNode, useState } from 'react';
import { LinkWrapper } from './LinkWrapper';

type Props = {
  children: ReactNode;
  audioTitle?: string;
  sourceTitle?: string;
  thumbnailUrl?: string;
  sourceLink?: string;
  isPlaying: boolean;
  onPlayClick: () => void;
  onStopClick: () => void;
  onRandomToggle: (bool: boolean) => void;
  onRepeatToggle: (bool: boolean) => void;
};

export function AudioMenu({
  children,
  audioTitle,
  sourceTitle,
  thumbnailUrl,
  sourceLink,
  isPlaying,
  onPlayClick,
  onStopClick,
  onRandomToggle,
  onRepeatToggle,
}: Props) {
  // const randomPlay = () => {
  //   const broadcast = broadcasts[Math.floor(Math.random() * broadcasts.length)];
  //   const buttonId = broadcast.buttonIds[Math.floor(Math.random() * broadcast.buttonIds.length)];
  //
  //   audioPlayer.effect().emit('play', broadcast, buttonId);
  // };

  const [random, setRandom] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const handleRandomToggle = () => {
    setRandom(!random);
    onRandomToggle(!random);
  };

  const handleRepeatToggle = () => {
    setRepeat(!repeat);
    onRepeatToggle(!repeat);
  };

  return (
    <Container>
      <AudioInfo>
        <LinkWrapper url={sourceLink}>
          <img src={thumbnailUrl} style={{ height: 64 }} />
        </LinkWrapper>
        {audioTitle && (
          <AudioInfoText>
            <div>
              <AudioTitle>
                {audioTitle} {isPlaying ? '🎶️' : '⏹'}
              </AudioTitle>
            </div>
            <div>
              <LinkWrapper url={sourceLink}>
                <SourceTitle>{sourceTitle}</SourceTitle>
              </LinkWrapper>
            </div>
          </AudioInfoText>
        )}
      </AudioInfo>
      <ControlButtons>
        <ButtonsContainer>
          <ControlButton onClick={onStopClick}>停止</ControlButton>
          <ControlButton onClick={onPlayClick}>再生</ControlButton>
        </ButtonsContainer>
        <ButtonsContainer>
          <p>
            <input checked={random} onClick={handleRandomToggle} type="checkbox" />
            ランダム
            <input checked={repeat} onClick={handleRepeatToggle} type="checkbox" />
            連続再生
          </p>
        </ButtonsContainer>
      </ControlButtons>
      <ShareContainer>{children}</ShareContainer>
    </Container>
  );
}
