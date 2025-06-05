import React, { createContext, useState, useContext } from "react";

const App = () => {
  return (
    <>
      <ChatContainer>
        <ChatHeader />
        <ChatBody />
        <ChatFooter />
        {chatStoreV2.showActionSheet && !chatStoreV2.showShareBetModal && (
          <ChatAction />
        )}
        {chatStoreV2.showShareBetModal && (
          <ShareBetOrderModal
            currentRoomConfig={chatStoreV2.currentRoomConfig}
          />
        )}
        {chatStoreV2.showEmojiKeyboard && !chatStoreV2.showShareBetModal && (
          <EmojiKeyboard onEmojiSelected={onPressEmoji} />
        )}
        <SendImageModal />
        <RedEnvelopeModal
          redEnvelopeDetailData={chatStoreV2.redEnvelopeDetailData}
          roomId={chatStoreV2.currentRoomId}
        />
        <FollowBetModal betData={chatStoreV2.betData} />
      </ChatContainer>
      <ConfirmationDialog ref={chatStoreV2.dialogRef} />
      <LoadingSpinnerOverlay
        ref={chatStoreV2.loadingSpinnerOverLay}
        modal={true}
        marginTop={64}
      />
    </>
  );
};


export default App;
