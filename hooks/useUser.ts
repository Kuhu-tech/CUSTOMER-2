"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchUser, createUser, updateUser } from "@/services/crud"
import type { UserProfile } from "@/types/user"

const PLACEHOLDER_USER_ID = "current-user"

export const useUser = (userId: string = PLACEHOLDER_USER_ID) => {
  const qc = useQueryClient()
  const queryKey = ["user", userId]

  const user = useQuery({
    queryKey,
    queryFn: () => fetchUser(userId),
  })

  const createProfile = useMutation({
    mutationFn: (data: Omit<UserProfile, "id">) => createUser(userId, data),
    onSuccess: () => qc.invalidateQueries({ queryKey }),
  })

  const updateProfile = useMutation({
    mutationFn: (data: Partial<Omit<UserProfile, "id">>) =>
      updateUser(userId, data),
    onSuccess: () => qc.invalidateQueries({ queryKey }),
  })

  return { user, createProfile, updateProfile }
}
