/* eslint-disable react-hooks/exhaustive-deps */

import { useToast } from '@chakra-ui/react'
import Button from '@components/Button'
import Box from '@components/common/Box'
import Text from '@components/common/Text'
import { addMessageToBrain, createChatSocket, newSession, receiveMessageFromBrain } from '@lib/Chat/ChatHelper'
import { ChatHistoryType, SkillChatHistoryType, SkillMessageHistoryType } from '@lib/dataTypes/Messaging/MessagingTypes'
import { ReceiverTimezoneFormDataResponseType } from '@lib/dataTypes/Messaging/ReceiverTimezoneFormDataResponseType'
import { dayjs } from '@lib/date-utils'
import { formattedTimezones } from '@lib/GPT/MeetingRequest/constants'
import { TimezoneObjectType } from '@lib/GPT/MeetingRequest/types'
import { palette } from '@lib/theme/theme'
import { useAppContext } from '@lib/user-context'
import Session from "supertokens-web-js/recipe/session"
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { IoIosCheckmark } from "react-icons/io"
import {
    Dimensions, Pressable, StyleSheet,
    FlatList, Modal, TouchableOpacity,
} from 'react-native'
import cls from 'classnames'
import ScrollContainer from '@components/chat/ScrollContainer'
import Message from '@components/chat/Message'
import ChatInput from '@components/chat/ChatInput'
import { checkIfCalendarWebhookExpired } from '@lib/calendarLib/googleCalendarHelper'
import { ObjectFieldType } from '@lib/dataTypes/Messaging/RequiredFieldsType'
import { NextApiRequest, NextApiResponse } from 'next';
import supertokensNode from 'supertokens-node'
import { backendConfig } from '../../../config/backendConfig'
import Session1 from 'supertokens-node/recipe/session'
import { getUserPreference } from '@lib/OnBoard/OnBoardHelper'

export async function getServerSideProps({ req, res }: { req: NextApiRequest, res: NextApiResponse }) {
  // Notice how the server uses `API` from `withSSRContext`, instead of the top-level `API`.
  // const SSR = withSSRContext({ req })
  // this runs on the backend, so we must call init on supertokens-node SDK
  supertokensNode.init(backendConfig())
  let session
  try {
    session = await Session1.getSession(req, res, {
      overrideGlobalClaimValidators: async function () {
        return []
      },
    })
  } catch (err: any) {
    if (err.type === Session1.Error.TRY_REFRESH_TOKEN) {
      return { props: { fromSupertokens: 'needs-refresh' } }
    } else if (err.type === Session1.Error.UNAUTHORISED) {
      // this will force the frontend to try and refresh which will fail
      // clearing all cookies and redirecting the user to the login screen.
      return { props: { fromSupertokens: 'needs-refresh' } }
    }
    throw err
  }

  if (!session?.getUserId()) {
    return {
      redirect: {
        destination: '/User/Login/UserLogin',
        permanent: false,
      },
    }
  }

  return {
    props: {
      sub: session.getUserId(),
    }
  }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    duration: {
        fontSize: '21px',
        lineHeight: '28px',
    },
   centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
       marginTop: 22,
       marginBottom: 22,
  } as any,
    modalView: {
      flex: 1,
    alignItems: "center",
  } as any,
}

let socket: WebSocket

function UserViewChat() {

    const [chatHistory, setChatHistory] = useState<ChatHistoryType | []>([{
        role: 'assistant',
        content: 'How can I help you today?',
        id: 0,
        date: dayjs().format(),
    }])
    const [messageHistory, setMessageHistory] = useState<SkillChatHistoryType | []>([{
        skill: 'pending',
        query: 'pending',
        messages: [],
    }])
    const [isNewSession, setIsNewSession] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    // const [token, setToken] = useState<string>('')
    // const [socket, setSocket] = useState<WebSocket>()
    const [formData, setFormData] = useState<ReceiverTimezoneFormDataResponseType>({
        type: 'select',
        value: dayjs.tz.guess(),
        name: dayjs.tz.guess(),
    })
    const [receiverTimezone, setReceiverTimezone] = useState<string>(dayjs.tz.guess())
    const [search, setSearch] = useState<string>('')
    const [isSelect, setIsSelect] = useState<boolean>(false)
    const [checkBoxArray, setCheckBoxArray] = useState<boolean[]>([])
    const [filteredTimezones, setFilteredTimezones] = useState<TimezoneObjectType[]>([])
    const [isForm, setIsForm] = useState<boolean>(false)
    const [reconnect, setReconnect] = useState<boolean>(false)
    const [htmlEmail, setHtmlEmail] = useState<string>('')

    // formattedTimezones: TimezoneObjectType[]

    const router = useRouter()
    const { sub, client } = useAppContext()
    const userId = sub
    const toast = useToast()

    // renew push notifictions
    useEffect(() => {
        if (userId) {
        (async () => checkIfCalendarWebhookExpired(client, userId))()
        }
        
    }, [client, userId])

    // check onboarding
    useEffect(() => {
        (async () => {
          if (!sub) {
              return
          }
          const user_preferenceDoc = await getUserPreference(client, sub)
          console.log(user_preferenceDoc?.onBoarded, ' user_preferenceDoc?.onBoarded')
          if (!user_preferenceDoc?.onBoarded) {
            console.log(' no user preference created')
            return router.push({ pathname: '/OnBoard/UserOnBoard'})
          }
            
        })()
      }, [client, router, sub])
    
    useEffect(() => {
        (async () => {
            try {
                const access_token = await Session.getAccessToken()
               
                if (!access_token) {
                    return
                }
                socket = await createChatSocket(access_token)
                // setSocket(newSocket)
                setReconnect(false)

            } catch (e) {
                console.log(e,  ' unable to get socket')
            }
        })()
    }, [reconnect, isNewSession])

    const onReceiveMessage = async (
        skillMessageHistory: SkillMessageHistoryType,
    ) => {
        try {
            await receiveMessageFromBrain(
                skillMessageHistory,
                chatHistory, 
                messageHistory,
                setChatHistory,
                setMessageHistory,
                setIsLoading,
            )
        } catch (e) {
            console.log(e, ' unable to receive message')
        }
    }

    socket?.addEventListener("open", (event) => {
        console.log(event, 'connection established')

        // socket.send(JSON.stringify({
        //     type: 'message',
        //     text: 'hello server',
            
        // }))
    })

    socket?.addEventListener("message", async (event) => {
        // SkillMessageHistoryType
        console.log(event,  ' message from api')
        console.log("Message from server ", event.data);
        /**
         * {"skill":"ask-availability","query":"completed","messages":[{"role":"user","content":"what is my availability like on Aug 7th?"},{"role":"assistant","content":"On August 7th, 2023, you have the following availability:\n- From 2:30 PM to 3:00 PM\n- From 5:00 PM to 11:00 PM."}],"required":null}
         */
        if (JSON.parse(event.data) === 'ping') {
            return
        }
        const skillMessageHistory: SkillMessageHistoryType = JSON.parse(event.data)
        if ((skillMessageHistory?.skill === 'generate-meeting-invite') || (skillMessageHistory?.skill === 'send-meeting-invite')) {

            const requiredFormData = skillMessageHistory?.required?.dateTime.required?.find((r) => ((r as ObjectFieldType)?.value === 'receiverTimezone'))
            if (requiredFormData) {
                setIsForm(true)
            } else {
                setIsForm(false)
            }
        }

        if (skillMessageHistory?.htmlEmail) {
            setHtmlEmail(skillMessageHistory?.htmlEmail)
        }

        await onReceiveMessage(skillMessageHistory)
    })

    socket?.addEventListener('error', async (event: any) => {
        console.log(event, ' error websocket connection')
    })

    socket?.addEventListener('close', async (e) => {
        console.log(e, 'WebSocket Connection is closed')


    })

    useEffect(() => {
        (() => {
            // generate checked array
            const newCheckedArray = formattedTimezones?.map(_ => false)

            setCheckBoxArray(newCheckedArray)
        })()
    }, [])

    const onSelectedItem = (index: number) => {
        // set selected checkbox
        const newCheckBoxArray = checkBoxArray?.map(_ => false)
        newCheckBoxArray[index] = true
        setCheckBoxArray(newCheckBoxArray)

        const selectedTimezone = formattedTimezones[index]
        setReceiverTimezone(selectedTimezone?.value)
        setFormData({
            type: 'select',
            value: selectedTimezone?.value,
            name: selectedTimezone?.label,
        })
    }

    const closeIsSelect = async () => {
        setIsSelect(false)
        await onSendMessage(formData?.value)
    }

    const openIsSelect = () => setIsSelect(true)
    
    const updateSearch = (text: string) => {
        setSearch(text)
        const regex = new RegExp(`\.*${text || ''}\.*`, 'gmi')
        const newFilteredArray = formattedTimezones?.filter(t => (regex.test(t?.label)))

        setFilteredTimezones(newFilteredArray)
    }

    type RenderItemType = {
        item: TimezoneObjectType,
        index: number,
    }

    const RenderItem = ({ item }: RenderItemType) => {
        const foundIndex = formattedTimezones?.findIndex(t => (t?.value === item?.value))

        return (
            <button onClick={() => onSelectedItem(foundIndex)} >
                <Box style={{ borderColor: palette.darkGray, borderBottomWidth: StyleSheet.hairlineWidth }} p={{ phone: 'm', tablet: 's' }} flexDirection="row" justifyContent="space-between" alignItems="center">
                    <Box style={{ width: '70%'}}>
                        <Text variant="optionHeader">
                            {item?.label}
                        </Text>
                    </Box>
                    <Box style={{ width: '30%'}} pr={{ phone: 'l', tablet: 'm'}} flexDirection="row" justifyContent="flex-end" alignItems="center">
                        {checkBoxArray?.[foundIndex] ? <IoIosCheckmark size="3em" color={palette.pinkPrimary} /> : null}
                    </Box>
                </Box>
            </button>
        )
    }

    const callNewSession = () => {
        newSession(
            setChatHistory,
            setMessageHistory,
            setReconnect,
            reconnect,
        )

        setIsNewSession(false)
    }

    const onSendMessage = async (text: string) => {
        try {
            
            const index = messageHistory?.length === 0 ? 0 : messageHistory?.length - 1

            switch(messageHistory[index]?.skill) {
                case 'generate-meeting-invite':
                    messageHistory[index].formData = formData
                
                case 'send-meeting-invite':
                    messageHistory[index].formData = formData
            }
            

            console.log(text, ' text inside onSendMessage')
            await addMessageToBrain(
                socket,
                text,
                userId,
                dayjs.tz.guess(), 
                chatHistory,
                messageHistory,
                setChatHistory,
                setMessageHistory,
                setIsLoading
            )
        } catch (e) {
            console.log(e, ' unable  on send message')
        }
    }


    const renderSelectTimezone = () => (
        <div>
            {isForm ?
                (
                    <Box justifyContent="flex-start" alignItems="center" style={{ width: '100%'}}>
                        <Text textAlign="center" p={{ phone: 's', tablet: 'm' }} variant="optionHeader" style={{ width: '80%'}}>
                            Select Receiver&apos;s timezone
                        </Text>
                        <Pressable onPress={openIsSelect}>
                            <Text textAlign="center" variant="buttonLink">
                                {receiverTimezone}
                            </Text>
                        </Pressable>
                    </Box>
                ) : null}
        </div>
    )

    return (
        <div className="flex flex-col items-center h-[60vh] bg-gray-500">
            <div className="bg-primary-content flex flex-col justify-center items-center w-full lg:w-1/2 h-full">
                
                <ScrollContainer scrollCta="New Message!" isNewSession={isNewSession} >
                    {
                        (chatHistory as ChatHistoryType)?.map((m, i) => (
                            <div key={m.id}>
                                {((chatHistory?.length - 1) === i)
                                    ? (
                                        <Message key={m.id} message={m} isLoading={isLoading} formData={renderSelectTimezone()} htmlEmail={htmlEmail} />
                                    ) : (
                                        <Message key={m.id} message={m} />
                                    )
                                }
                            </div>
                        ))
                    }
                </ScrollContainer>
                <ChatInput 
                    sendMessage={onSendMessage} 
                    isNewSession={isNewSession} 
                    callNewSession={callNewSession} 
                />
                
            </div>
            <Box>
                <Modal animationType="slide"
                    visible={isSelect} onRequestClose={closeIsSelect}>
                    <Box style={styles.centeredView}>
                        <Box style={styles.modalView}>
                            <form>   
                                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                    </div>
                                    <input value={search} onChange={(e) => updateSearch(e?.target?.value)} type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500" placeholder="Type Timezone" required />
                                </div>
                            </form>
                            {filteredTimezones?.length > 0
                                ? (
                                    
                                        <FlatList
                                            data={filteredTimezones}
                                            keyExtractor={item => item.key}
                                            renderItem={RenderItem}
                                        />
                                   
                                )
                                : (
                                   
                                        <FlatList
                                            data={formattedTimezones}
                                            keyExtractor={item => item.key}
                                            renderItem={RenderItem}
                                        />
                                    
                                )
                            }
                            <Box>
                                <Button onClick={closeIsSelect}>
                                    Close
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Modal>
            </Box>
        </div>
    )

}

export default UserViewChat


